import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PermissionGroup } from "../models/PermissionGroup";

@Injectable({ providedIn: "root" })
export class PermissionService {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  getPermissions(): Observable<PermissionGroup[]> {
    return this.http.get<PermissionGroup[]>(`${this.backendUrl}/api/permissions`);
  }
}
