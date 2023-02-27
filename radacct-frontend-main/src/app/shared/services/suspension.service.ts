import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ClientWillSuspend } from "../models/ClientWillSuspend";

@Injectable({ providedIn: "root" })
export class SuspensionService {
  private backend_url: string = environment.backendUrl;
  constructor(private http: HttpClient) {}

  addClientToSuspend(tel_adsl: number, mac: string) {
    let client = {
      tel_adsl,
      mac,
    };
    return this.http.post(`${this.backend_url}/api/suspension/by-client`, client)
  }

  uploadCsvFile(file: File): Observable<{
    message: string;
    rejectedClients: number[];
    clientsNotFound: number[];
    clientsAlreadyUploaded: number[];
    acceptedClientsLength: number;
  }> {
    const formData = new FormData();
    formData.append("suspensionFile", file, file.name);
    return this.http.post<{
      message: string;
      rejectedClients: number[];
      clientsNotFound: number[];
      clientsAlreadyUploaded: number[];
      acceptedClientsLength: number;
    }>(`${this.backend_url}/api/suspension`, formData);
  }

  getClientsWillSuspend(): Observable<ClientWillSuspend[]> {
    return this.http.get<ClientWillSuspend[]>(
      `${this.backend_url}/api/suspension`
    );
  }
}
