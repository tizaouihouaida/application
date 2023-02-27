import { Permission } from "./Permission";

export interface PermissionGroup {
    id: number,
    name: string,
    key: string,
    createdAt: string,
    updatedAt: string,
    Permissions: Permission[]
}