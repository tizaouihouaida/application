import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { FirstConnexion } from "../models/FirstConnexion";
import { Observable } from "rxjs";

@Injectable({
    'providedIn': 'root'
})
export class FirstConnexionService {
    private backend_url: string = environment.backendUrl;
    constructor(private http: HttpClient) {}

    getFirstConnexion(telAdsl: number): Observable<FirstConnexion> {
        return this.http.get<FirstConnexion>(`${this.backend_url}/api/first-connexion/${telAdsl}`);
    }
}