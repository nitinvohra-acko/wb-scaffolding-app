export interface RoleToPermission {
  id: string;
  name: string;
  description: string;
  scopeParamRequired: string | null;
  composite: boolean;
  composites: string[] | null;
  clientRole: boolean;
  containerId: string;
  attributes: {
    permissions: string[];
  };
}
