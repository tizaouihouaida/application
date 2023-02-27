import { Role } from "./Role";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isEnabled: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  RoleId: number;
  Role: Role;
}
