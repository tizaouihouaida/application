import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  permissionSubject = new Subject<string[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(
    email: string,
    password: string
  ): Observable<{ token: string; expiresIn: number; permissions: string[] }> {
    const authData: any = { email: email, password: password };
    return this.http.post<{
      token: string;
      expiresIn: number;
      permissions: string[];
    }>(`${environment.backendUrl}/api/auth/login`, authData);
  }

  // save data in local storage
  saveAuthData(token: string, expirationDate: Date, permissions: string[]) {
    this.token = token;
    this.isAuthenticated = true;
    let permissionsJoined = permissions.join(" ");
    let cryptedPermissions = CryptoJS.AES.encrypt(
      permissionsJoined,
      "secret key 123"
    ).toString();

    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("permissions", cryptedPermissions);
  }

  getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const permissions = localStorage.getItem("permissions");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      permissions: permissions,
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.logout();
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  // logout, clear data and timeout
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  // logout after duration
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // clear local storage
  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("permissions");
  }

  getPermissions(): string[] {
    let cryptedPermissions = localStorage.getItem("permissions");
    let bytes = CryptoJS.AES.decrypt(cryptedPermissions, "secret key 123");
    let originalPermissions = bytes.toString(CryptoJS.enc.Utf8);
    let permissions = originalPermissions.split(' ');
    // this.permissionSubject.next(permissions);
    return permissions;
  }
}
