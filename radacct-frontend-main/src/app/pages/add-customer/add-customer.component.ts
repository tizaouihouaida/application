import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Customer } from "src/app/shared/models/Customer";
import { CustomerService } from "src/app/shared/services/customer.service";

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.scss"],
})
export class AddCustomerComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  customer: Customer;
  customerForm: FormGroup;
  mode: string = "create";
  customerId: number;
  isLoading = false;
  isSubmit: boolean = false;
  constructor(
    private CustomerService: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initcustomerForm();
    this.checkMode();
  }

  initcustomerForm() {
    this.customerForm = this.fb.group({
      name: [null, [Validators.required]],
      CIN: [null, [Validators.required]],
      tel_adsl: [null, [Validators.required]],
      mac: [null, [Validators.required]],
      groupname: [null, [Validators.required]],
    });
  }


  checkMode() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.customerId = +paramMap.get("id");
        this.mode = "edit";
        this.getCustomerById(this.customerId);
      } else {
        this.mode = "create";
        this.customerId = null;
      }
    });
  }

  getCustomerById(id: number) {
    this.isLoading = true;
    this.CustomerService.getCustomerById(id).subscribe({
      next: (customer: Customer) => {
        this.isLoading = false;
        this.customer = customer;
        this.patchcustomerForm();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred please connect the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }


  patchcustomerForm() {
    this.customerForm.patchValue({
      name: this.customer.customerName,
      CIN: this.customer.CIN,
      tel_adsl: this.customer.tel_adsl,
      mac: this.customer.mac,
      groupname: this.customer.groupname
    });
  }

  saveCustomer() {
    this.isLoading = true;
    this.isSubmit = true;
    if (this.customerForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.CustomerService.createCustomer(this.customerForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/customers"]);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.message === "customer_exist") {
            this.errorMessage =
              "customer already exist";
          } else {
            this.errorMessage =
              "An error occurred please try again or contact the support";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
    } this.CustomerService.editCustomer(this.customerId, this.customerForm.value).subscribe({
      next: (response: {message: string}) => {
        this.isLoading = false;
        this.router.navigate(["/customers"]);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error.message === "customer_exist") {
          this.errorMessage =
            "customer already exist";
        } else {
          this.errorMessage =
            "An error occurred please try again or contact the support";
        }
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    })
  }
}
