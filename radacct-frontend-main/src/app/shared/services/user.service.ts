import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/User";

interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isEnabled: boolean;
  roleId: number;
}

interface UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  isEnabled: boolean;
  roleId: number;
}

@Injectable({ providedIn: "root" })
export class UserService {
  private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createUser(createUserDto: CreateUserDto) {
    return this.http.post(`${this.backendUrl}/api/user`, createUserDto);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.backendUrl}/api/user`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.backendUrl}/api/user/${id}`);
  }

  editUser(id: number, updateUserDto: UpdateUserDto) {
    return this.http.put(`${this.backendUrl}/api/user/${id}`, updateUserDto);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.backendUrl}/api/user/${id}`);
  }
}
