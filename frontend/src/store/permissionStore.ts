import { create } from 'zustand';

interface PermissionStore {
  permissions: string[];
  setPermissions: (permissions: string[]) => void;
}

export const usePermissionStore = create<PermissionStore>((set) => ({
  permissions: ['administrative:view', 'dashboard:view'],
  setPermissions: (permissions) => set({ permissions }),
}));
