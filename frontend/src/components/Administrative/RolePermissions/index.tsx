'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePermissionStore } from '@/store/permissionStore';
import { RoleToPermission } from '@/types/role';
import { useUserPermissions } from '@/hooks/useUserPermissions';

const RolePermissions = () => {
  const { fetchAllRoleToPermissions, createRoleToPermissions } =
    useUserPermissions();
  const [rolePermissions, setRolePermissions] = useState<RoleToPermission[]>(
    [],
  );
  const [modifiedRoles, setModifiedRoles] = useState<Set<string>>(new Set());
  const [isSavingRoles, setIsSavingRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedPermission, setSelectedPermission] = useState<string>('');
  const [availablePermissions, setAvailablePermissions] = useState<string[]>(
    [],
  );
  const [newlyAddedPermissions, setNewlyAddedPermissions] = useState<
    Set<string>
  >(new Set());

  const fetchPermissions = async () => {
    try {
      const response = await fetch('/api/rbac/components');
      const data = await response.json();
      const permissions = data.components?.map(
        (component: { requiredPermission: string }) =>
          component.requiredPermission,
      );
      setAvailablePermissions(permissions);
      // Also update the original permissions for tracking changes
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    }
  };
  const getAllRoleToPermissions = async () => {
    try {
      const response =
        (await fetchAllRoleToPermissions()) as RoleToPermission[];
      const data = response?.filter((res) => res?.attributes?.permissions);
      setRolePermissions(data);
      console.log(response);
    } catch (error) {
      console.error('Failed to fetch role permissions:', error);
    }
  };

  useEffect(() => {
    fetchPermissions();
    getAllRoleToPermissions();
  }, []);

  const addPermissionToRole = () => {
    if (!selectedRole || !selectedPermission) return;

    setRolePermissions((prev) => {
      return prev.map((role) => {
        if (role.id === selectedRole) {
          if (!role.attributes.permissions.includes(selectedPermission)) {
            setModifiedRoles((prevModified) =>
              new Set(prevModified).add(selectedRole),
            );

            return {
              ...role,
              attributes: {
                ...role.attributes,
                permissions: [
                  ...role.attributes.permissions,
                  selectedPermission,
                ],
              },
            };
          }
        }

        return role;
      });
    });
    setSelectedPermission('');
  };

  const removePermission = (roleId: string, permission: string) => {
    setRolePermissions((prev) => {
      return prev.map((role) => {
        if (role.id === roleId) {
          setModifiedRoles((prevModified) => new Set(prevModified).add(roleId));
          return {
            ...role,
            attributes: {
              ...role.attributes,
              permissions: role.attributes.permissions.filter(
                (p) => p !== permission,
              ),
            },
          };
        }
        return role;
      });
    });
  };

  const handleSaveRolePermissions = async () => {
    if (modifiedRoles.size === 0) return;

    setIsSavingRoles(true);
    try {
      // Create the payload of type { roleName: string; permission: string[]; }[]
      const payload = Array.from(modifiedRoles).map((roleId) => {
        const role = rolePermissions.find((r) => r.id === roleId);
        return {
          roleName: role?.name || '',
          permissions: role?.attributes.permissions || [],
        };
      });
      console.log(payload);
      const res = createRoleToPermissions(payload);
      setModifiedRoles(new Set());
    } catch (error) {
      console.error('Error saving role permissions:', error);
    } finally {
      setIsSavingRoles(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3">
      <h1 className="text-2xl font-bold mb-6">Role Permissions Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role to Permission Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {rolePermissions.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
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
                  {availablePermissions?.map((permission) => (
                    <SelectItem key={permission} value={permission}>
                      {permission}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={addPermissionToRole}>Add Permission</Button>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {rolePermissions.map((role) => {
                const isModified = modifiedRoles.has(role.id);

                return (
                  <div
                    key={role.id}
                    className={`border rounded-lg p-4 transition-colors duration-200 ${
                      isModified ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      {role.name}
                      {isModified && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          Modified
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {role.attributes.permissions.map((permission) => (
                        <Badge
                          key={`${role.id}-${permission}`}
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
                              removePermission(role.id, permission)
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
