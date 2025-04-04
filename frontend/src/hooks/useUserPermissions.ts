import { useMemo } from 'react';
import { usePermissionStore } from '@/store/permissionStore';
import { apiClient } from '@/utils/interceptor';
import { RoleToPermission } from '@/types/role';

export const useUserPermissions = () => {
  const { permissions, setPermissions } = usePermissionStore();
  const hasPermission = useMemo(
    () => (requiredPermission: string) =>
      permissions.includes(requiredPermission),
    [permissions],
  );
  const fetchAllRoleToPermissions = async () => {
    try {
      const response = await apiClient('/api/user/role', 'GET');
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRoleToPermissions = async (role: string) => {
    try {
      const response = await apiClient('/api/user/role/' + role, 'GET');
      const data = (await response) as RoleToPermission;
      console.log(data);
      setPermissions(data?.attributes?.permissions);
    } catch (error) {
      console.log(error);
    }
  };
  const createRoleToPermissions = async (
    payload: {
      roleName: string;
      permissions: string[];
    }[],
  ) => {
    try {
      const response = await apiClient('/api/user/role', 'POST', {
        body: payload,
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    hasPermission,
    permissions,
    fetchAllRoleToPermissions,
    fetchRoleToPermissions,
    createRoleToPermissions,
  };
};
