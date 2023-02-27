import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Radacct } from "../models/Radacct";

@Injectable({ providedIn: 'root'})
export class RadacctService {
    private url = environment.backendUrl;
    constructor(private http: HttpClient) {}

    getRadacct(telAdsl: string, startDate: string, endDate: string): Observable<{total: number, radaccts: Radacct[]}> {
        return this.http.get<{total: number, radaccts: Radacct[]}>(`${this.url}/api/radacct?telAdsl=${telAdsl}&startDate=${startDate}&endDate=${endDate}`);
    }
}