import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Customer } from "../models/Customer";

interface CustomerDto {
  customerName: string;
  CIN: number;
  tel_adsl: number;
  mac: string;
  groupname: string;
}

@Injectable({ providedIn: "root" })
export class CustomerService {
  private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  getAllCustomers(
    currentPage: number,
    itemsPerPage: number,
    search: string
  ): Observable<{ customers: Customer[]; totalCustomers: number }> {
    return this.http.get<{ customers: Customer[]; totalCustomers: number }>(
      `${this.backendUrl}/api/customer?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&search=${search}`
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.backendUrl}/api/customer/${id}`);
  }

  createCustomer(createCustomerDto: CustomerDto) {
    return this.http.post(`${this.backendUrl}/api/customer`, createCustomerDto);
  }

  editCustomer(id: number, updateCustomerDto: CustomerDto) {
    return this.http.put(
      `${this.backendUrl}/api/customer/${id}`,
      updateCustomerDto
    );
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.backendUrl}/api/customer/${id}`);
  }
}
