import { Component, OnInit } from "@angular/core";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { Customer } from "src/app/shared/models/Customer";
import { AuthService } from "src/app/shared/services/auth.service";
import { CustomerService } from "src/app/shared/services/customer.service";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  CustomerToDelete: Customer;
  isLoading = false;
  permissions: string[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalCustomers: number = 0;
  customers: Customer[] = [];

  searchInput: string = "";
  isSearch: boolean = false;
 
  constructor(
    private CustomerService: CustomerService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }
  ngOnInit(): void {
    this.getAllCustomers(this.currentPage, this.itemsPerPage, this.searchInput);
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getAllCustomers(currentPage: number, itemsPerPage: number, search: string) {
    this.isLoading = true;
    this.CustomerService.getAllCustomers(currentPage, itemsPerPage, search).subscribe({
      next: (customersData: {customers: Customer[], totalCustomers: number}) => {
        this.isLoading = false;
        this.customers = customersData.customers;
        this.totalCustomers = customersData.totalCustomers;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      },
    });
  }

  open(content, customer: Customer) {
    this.deleteAlertMessage = `Are you sure you want to delete ${customer.customerName}`;
    this.CustomerToDelete = customer;
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  deleteCustomer() {
    this.isLoading = true;
    this.CustomerService.deleteCustomer(this.CustomerToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "Customer deleted successfully";
        setTimeout(() => {
          this.getAllCustomers;
          this.isLoading = false;
          this.successMessage = "";
        }, 5000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      },
    });
  }

  pageChanged(event: any) {
    this.currentPage = event;
    this.getAllCustomers(this.currentPage, this.itemsPerPage, this.searchInput);
  }

  search() {
    this.isSearch = true;
    this.getAllCustomers(this.currentPage, this.itemsPerPage, this.searchInput);
  }
}