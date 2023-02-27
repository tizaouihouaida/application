import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Profile } from "../models/Profile";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private backend_url = environment.backendUrl;
  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.backend_url}/api/profile`);
  }

  updateMyProfile(firstName: string, lastName: string, image: File) {
    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (image) {
        formData.append("image", image, image?.name);
    }
    return this.http.put(`${this.backend_url}/api/profile`, formData);
  }
}
