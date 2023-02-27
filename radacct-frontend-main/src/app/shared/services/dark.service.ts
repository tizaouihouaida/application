import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ClientStatus } from "../models/ClientStatus";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DarkService {
  private host_lns = environment.host_lns;
  constructor(private http: HttpClient) {}

  getClientDetails(search: string): Observable<ClientStatus> {
    let searchObject = {
      tel: search,
    };
    return this.http.post<ClientStatus>(`${this.host_lns}/api/`, searchObject);
  }


  clearInterface(mac: string) {
    let object = {
      tel: mac
    }
    return this.http.post(`${this.host_lns}/clear_api/`, object);
  }
}
