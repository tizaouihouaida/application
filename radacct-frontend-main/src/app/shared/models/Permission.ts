import { RolePermissions } from "./RolePermissions";

export interface Permission {
  id: number;
  name: string;
  key: string;
  createdAt: string;
  updatedAt: string;
  PermissionGroupId?: number;
  RolePermissions?: RolePermissions;
}
