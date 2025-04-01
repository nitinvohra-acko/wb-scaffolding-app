import { useMemo } from 'react';
import { usePermissionStore } from '@/store/permissionStore';

export const useUserPermissions = () => {
  const permissions = usePermissionStore((state) => state.permissions);
  console.log(permissions);
  const hasPermission = useMemo(
    () => (requiredPermission: string) =>
      permissions.includes(requiredPermission),
    [permissions],
  );

  return { hasPermission, permissions };
};
