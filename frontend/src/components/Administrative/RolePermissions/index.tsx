'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, X, Plus, Trash2 } from 'lucide-react';
import { mockRolePermissions } from './mockData';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import useUsersStore from '@/store/users';
import { usePermissionStore } from '@/store/permissionStore';

const RolePermissions = () => {
  const [rolePermissions, setRolePermissions] = useState(mockRolePermissions);
  const [originalPermissions] = useState(mockRolePermissions); // Keep track of original state
  const [modifiedRoles, setModifiedRoles] = useState<Set<string>>(new Set());
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);
  const [isSavingRoles, setIsSavingRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    keyof typeof mockRolePermissions | ''
  >('');
  const [selectedPermission, setSelectedPermission] = useState<string>('');
  const { permissions, setPermissions } = usePermissionStore();
  const [availablePermissions, setAvailablePermissions] = useState<string[]>(
    [],
  );
  const [originalAvailablePermissions] = useState<string[]>(permissions);
  const [newPermission, setNewPermission] = useState('');
  const [isPermissionListModified, setIsPermissionListModified] =
    useState(false);
  const [newlyAddedPermissions, setNewlyAddedPermissions] = useState<
    Set<string>
  >(new Set());
  const [deletedPermissions, setDeletedPermissions] = useState<Set<string>>(
    new Set(),
  );

  const fetchPermissions = async () => {
    try {
      const response = await fetch('/api/rbac/components');
      const data = await response.json();
      console.log(data);
      const permissions = data.components?.map(
        (component: { requiredPermission: string }) =>
          component.requiredPermission,
      );
      console.log(permissions);
      setAvailablePermissions(permissions);
      // Also update the original permissions for tracking changes
      originalAvailablePermissions.length = 0;
      originalAvailablePermissions.push(...permissions);
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const addPermissionToRole = () => {
    if (!selectedRole || !selectedPermission) return;

    setRolePermissions((prev) => {
      const currentPermissions = prev[selectedRole] || [];
      if (currentPermissions.includes(selectedPermission)) return prev;

      setModifiedRoles((prev) => new Set(prev).add(selectedRole));
      return {
        ...prev,
        [selectedRole]: [...currentPermissions, selectedPermission],
      };
    });
    setSelectedPermission('');
  };

  const removePermission = (
    role: keyof typeof mockRolePermissions,
    permission: string,
  ) => {
    setRolePermissions((prev) => {
      setModifiedRoles((prevRoles) => new Set(prevRoles).add(role));
      return {
        ...prev,
        [role]: prev[role].filter((p) => p !== permission),
      };
    });
  };

  const handleSavePermissionList = async () => {
    if (!isPermissionListModified) return;

    setIsSavingPermissions(true);
    try {
      const response = await fetch('/api/permissions/list', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permissions: availablePermissions }),
      });

      if (!response.ok) {
        throw new Error('Failed to save permission list');
      }

      setIsPermissionListModified(false);
      setNewlyAddedPermissions(new Set());
      setDeletedPermissions(new Set());
      // Update original permissions after successful save
      originalAvailablePermissions.length = 0;
      originalAvailablePermissions.push(...availablePermissions);
    } catch (error) {
      console.error('Error saving permission list:', error);
      alert('Failed to save permission list. Please try again.');
    } finally {
      setIsSavingPermissions(false);
    }
  };

  const handleSaveRolePermissions = async () => {
    if (modifiedRoles.size === 0) return;

    setIsSavingRoles(true);
    try {
      const response = await fetch('/api/permissions/roles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roles: Object.fromEntries(
            Array.from(modifiedRoles).map((role) => [
              role,
              rolePermissions[role as keyof typeof mockRolePermissions],
            ]),
          ),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save role permissions');
      }

      setModifiedRoles(new Set());
    } catch (error) {
      console.error('Error saving role permissions:', error);
      alert('Failed to save role permissions. Please try again.');
    } finally {
      setIsSavingRoles(false);
    }
  };

  const addNewPermission = () => {
    if (!newPermission || availablePermissions.includes(newPermission)) return;
    setAvailablePermissions((prev) => [...prev, newPermission]);
    setNewlyAddedPermissions((prev) => new Set(prev).add(newPermission));
    setNewPermission('');
    setIsPermissionListModified(true);
  };

  const removeAvailablePermission = (permissionToRemove: string) => {
    // Check if permission is in use by any role
    const isPermissionInUse = Object.values(rolePermissions).some(
      (permissions) => permissions.includes(permissionToRemove),
    );

    if (isPermissionInUse) {
      alert(
        'Cannot remove permission as it is currently assigned to one or more roles',
      );
      return;
    }

    setAvailablePermissions((prev) =>
      prev.filter((permission) => permission !== permissionToRemove),
    );

    // If it was a newly added permission, just remove it from that list
    if (newlyAddedPermissions.has(permissionToRemove)) {
      setNewlyAddedPermissions((prev) => {
        const updated = new Set(prev);
        updated.delete(permissionToRemove);
        return updated;
      });
    }
    // Otherwise mark it as deleted if it was in the original list
    else if (originalAvailablePermissions.includes(permissionToRemove)) {
      setDeletedPermissions((prev) => new Set(prev).add(permissionToRemove));
    }

    setIsPermissionListModified(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-3">
      <h1 className="text-2xl font-bold mb-6">Role Permissions Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Permission List Management Section
        <Card>
          <CardHeader>
            <CardTitle>Available Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Enter new permission"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNewPermission()}
                className="max-w-xs"
              />
              <Button onClick={addNewPermission}>
                <Plus className="h-4 w-4 mr-2" />
                Add Permission
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availablePermissions.map((permission) => {
                const isNewlyAdded = newlyAddedPermissions.has(permission);

                return (
                  <Badge
                    key={permission}
                    variant={isNewlyAdded ? 'default' : 'outline'}
                    className={`group hover:border-red-200 ${
                      isNewlyAdded
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : ''
                    }`}
                  >
                    {permission}
                    {isNewlyAdded && (
                      <span className="ml-1 text-xs">(new)</span>
                    )}
                    <button
                      onClick={() => removeAvailablePermission(permission)}
                      className="ml-2 opacity-0 group-hover:opacity-100 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </Badge>
                );
              })}
            </div>

            {deletedPermissions.size > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">
                  Permissions to be deleted:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(deletedPermissions).map((permission) => (
                    <Badge
                      key={permission}
                      variant="outline"
                      className="bg-red-100 text-red-800"
                    >
                      {permission}
                      <span className="ml-1 text-xs">(deleted)</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            {isPermissionListModified && (
              <Button
                onClick={handleSavePermissionList}
                disabled={isSavingPermissions}
              >
                {isSavingPermissions ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Permission List
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card> */}

        {/* Role to Permission Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Select
                value={selectedRole}
                onValueChange={(value) =>
                  setSelectedRole(value as keyof typeof mockRolePermissions)
                }
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(rolePermissions).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedPermission}
                onValueChange={setSelectedPermission}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select permission" />
                </SelectTrigger>
                <SelectContent>
                  {availablePermissions.map((permission) => (
                    <SelectItem key={permission} value={permission}>
                      {permission}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={addPermissionToRole}>Add Permission</Button>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {Object.entries(rolePermissions).map(([role, permissions]) => {
                const isModified = modifiedRoles.has(role);

                return (
                  <div
                    key={role}
                    className={`border rounded-lg p-4 transition-colors duration-200 ${
                      isModified ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      {role}
                      {isModified && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          Modified
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {permissions.map((permission) => (
                        <Badge
                          key={`${role}-${permission}`}
                          variant={isModified ? 'default' : 'secondary'}
                          className={
                            newlyAddedPermissions.has(permission)
                              ? 'bg-green-100 text-green-800'
                              : ''
                          }
                        >
                          {permission}
                          {newlyAddedPermissions.has(permission) && (
                            <span className="ml-1 text-xs">(new)</span>
                          )}
                          <button
                            onClick={() =>
                              removePermission(
                                role as keyof typeof mockRolePermissions,
                                permission,
                              )
                            }
                            className="ml-2 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            {modifiedRoles.size > 0 && (
              <Button
                onClick={handleSaveRolePermissions}
                disabled={isSavingRoles}
              >
                {isSavingRoles ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Role Permissions
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RolePermissions;
