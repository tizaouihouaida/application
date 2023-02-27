import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Modem } from "../models/Modem";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModemService {
    private backend_url = environment.backendUrl;
    constructor(private http: HttpClient) {}

    filterModem(filter: string): Observable<Modem> {
        let search = {filter: filter};
        return this.http.post<Modem>(`${this.backend_url}/api/modem`, search);
    }
}