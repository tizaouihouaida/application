import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Historic } from "../models/Historic";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HistoricService {
  private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  getHistoric(telAdsl: number): Observable<Historic[]> {
    return this.http.post<Historic[]>(`${this.backendUrl}/api/historic`, {
      telAdsl: telAdsl,
    });
  }
}
