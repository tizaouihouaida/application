import { Permission } from "./Permission";

export interface Role {
  id: number;
  name: string;
  key: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  Permissions?: Permission[];
}
