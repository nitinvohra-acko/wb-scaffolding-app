'use client';
import { Fragment, ComponentType, useEffect } from 'react';
import { useUserPermissions } from '@/hooks/useUserPermissions';

const registerRBACComponent = (name: string, permission: string) => {
  //   if (process.env.NODE_ENV === 'development') {
  fetch(process.env.NEXT_PUBLIC_APP_BASE_URL + '/api/rbac/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, permission }),
  });
  //   }
};

export function withRBAC<P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredPermission: string,
  FallbackComponent: ComponentType<P> | null = null,
) {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;
  registerRBACComponent(componentName, requiredPermission);

  return function WithRBACWrapper(props: P) {
    const { hasPermission } = useUserPermissions();

    if (!hasPermission(requiredPermission)) {
      console.log('not allowed');
      return FallbackComponent ? (
        <FallbackComponent {...props} />
      ) : (
        <Fragment />
      );
    }

    return <WrappedComponent {...props} />;
  };
}
