import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "../models/Role";

interface CreateRoleDto {
  name: string;
  description: string;
  permissions: number[];
}

@Injectable({ providedIn: "root" })
export class RoleService {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createRole(createRoleDto: CreateRoleDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.backendUrl}/api/role`,
      createRoleDto
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.backendUrl}/api/role`);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.backendUrl}/api/role/${id}`);
  }

  editRole(
    id: number,
    updateRoleDto: CreateRoleDto
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.backendUrl}/api/role/${id}`,
      updateRoleDto
    );
  }

  deleteRole(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.backendUrl}/api/role/${id}`
    );
  }
}
