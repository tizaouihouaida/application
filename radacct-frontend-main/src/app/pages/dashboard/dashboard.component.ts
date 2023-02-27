import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClientStatus } from "src/app/shared/models/ClientStatus";
import { Historic } from "src/app/shared/models/Historic";
import { DarkService } from "src/app/shared/services/dark.service";
import { HistoricService } from "src/app/shared/services/historic.service";
import { ReactivationService } from "src/app/shared/services/reactivation.service";
import { SuspensionService } from "src/app/shared/services/suspension.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  isLoading: boolean = false;
  isLoadingHistoric: boolean = false;
  clientStatus: ClientStatus;
  lnsResponse: string[] = [];
  errorMessage: string = "";
  successMessage: string = "";
  historic: Historic[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(
    private darkService: DarkService,
    private historicService: HistoricService,
    private reactivationService: ReactivationService,
    private suspensionService: SuspensionService
  ) {}
  ngOnInit() {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl("", [Validators.required]),
    });
  }

  Search() {
    this.clientStatus = undefined;
    this.lnsResponse = [];
    this.historic = [];
    this.isLoading = true;
    this.darkService.getClientDetails(this.searchForm.value.search).subscribe({
      next: (clientStatus: ClientStatus) => {
        this.isLoading = false;
        this.clientStatus = clientStatus;
        if (
          this.clientStatus?.lns_response &&
          this.clientStatus.lns_response !== "none"
        ) {
          this.lnsResponse = this.clientStatus.lns_response
            .split(" ")
            .filter(
              (element) =>
                element !== "" && element !== "-" && element !== "\r\n"
            )
            .join(",")
            .split("\r\n")
            .filter((el) => el !== "")[0]
            .split(",");
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error.error == "no_data_found") {
          this.errorMessage = "Client not found. Please check your input!";
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        }
      },
    });
  }

  suspendClient() {
    this.suspensionService
      .addClientToSuspend(this.clientStatus.tel_fix, this.clientStatus.mac)
      .subscribe({
        next: (response) => {
          this.successMessage = "Client added to suspend list";
          setTimeout(() => {
            this.successMessage = "";
          }, 5000);
        },
        error: (error) => {
          if (error.error.code == "client_already_suspended") {
            this.errorMessage = "Client already suspended";
          } else if (error.error.code == "client_already_uploaded") {
            this.errorMessage = "Client already uploaded";
          } else {
            this.errorMessage = "an error occurred. Please try again";
          }

          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
  }

  reactivateClient() {
    this.reactivationService
      .addClientToReactivate(this.clientStatus.tel_fix, this.clientStatus.mac)
      .subscribe({
        next: (response) => {
          this.successMessage = "Client added to Reactivate list";
          setTimeout(() => {
            this.successMessage = "";
          }, 5000);
        },
        error: (error) => {
          if (error.error.code == "client_already_uploaded") {
            this.errorMessage = "Client already uploaded";
          } else {
            this.errorMessage = "an error occurred. Please try again";
          }

          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
  }

  isSuspended(ip: string) {
    return ip.startsWith("10") ? "suspended" : "not suspended";
  }

  clearInterface() {
    this.darkService.clearInterface(this.clientStatus.mac).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  viewHistoric() {
    this.isLoadingHistoric = true;
    if(this.clientStatus) {
      this.historicService.getHistoric(this.clientStatus.tel_fix).subscribe({
        next: (historic) => {
          this.isLoadingHistoric = false;
          this.historic = historic;
        },
        error: (error) => {
          this.isLoadingHistoric = false;
          this.errorMessage =  "an error occurred. Please try again";
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        }
      })
    }
  }


  formatPeriode(period: number) {
    // let periodWithSecond = period / 1000;
    const days = Math.floor(period / (3600 * 24));
    const hours = Math.floor((period - days * 24 * 3600) / 3600);
    const minutes = Math.floor(
      (period - hours * 3600 - days * 24 * 3600) / 60
    );
    const seconds = period % 60;
    if (days > 0) {
      return `${days}d:${hours}h:${minutes}m:${seconds}s`;
    } else {
      return `${hours}h:${minutes}m:${seconds}s`;
    }
  }
}
