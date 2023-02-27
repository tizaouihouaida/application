import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Radacct } from "src/app/shared/models/Radacct";
import { RadacctService } from "../../shared/services/radacct.service";
import { DateValidator, GreaterThanToday } from "./DateValidator";

@Component({
  selector: "app-tables",
  templateUrl: "./radacct.component.html",
  styleUrls: ["./radacct.component.scss"],
})
export class RadacctComponent implements OnInit {
  searchForm: FormGroup;
  radaccts: Radacct[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;
  errorMessage: string = "";
  total: number;
  constructor(private radacctService: RadacctService) {}

  ngOnInit() {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = new FormGroup(
      {
        telAdsl: new FormControl("", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern("^[0-9]*$"),
        ]),
        startDate: new FormControl("", [Validators.required, GreaterThanToday]),
        endDate: new FormControl("", [Validators.required, GreaterThanToday]),
      },
      {
        validators: [DateValidator.startDateGreaterThanEndDate()],
      }
    );
  }

  searchClientByTelAdslAndStartDate() {
    if (this.searchForm.invalid) {
        return;
    }

    this.isLoading = true;
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.radacctService
      .getRadacct(
        this.searchForm.value.telAdsl,
        this.searchForm.value.startDate,
        this.searchForm.value.endDate
      )
      .subscribe({
        next: (radacctData: {total: number, radaccts: Radacct[]}) => {
          this.isLoading = false;
          this.radaccts = radacctData.radaccts;
          this.total = radacctData.total;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error.code;
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
  }

  formatPeriode(period: number) {
    let periodWithSecond = period / 1000;
    const days = Math.floor(periodWithSecond / (3600 * 24));
    const hours = Math.floor((periodWithSecond - days * 24 * 3600) / 3600);
    const minutes = Math.floor(
      (periodWithSecond - hours * 3600 - days * 24 * 3600) / 60
    );
    const seconds = periodWithSecond % 60;
    if (days > 0) {
      return `${days}d:${hours}h:${minutes}m:${seconds}s`;
    } else {
      return `${hours}h:${minutes}m:${seconds}s`;
    }
  }

  formatRadacctPeriod(period: number) {
    let periodWithSecond = period / 1000;
    const days = Math.floor(periodWithSecond / (3600 * 24));
    return `${days}d`
  }

  formatName(name: string) {
    let nameParts = name.split(" ");
    return nameParts[0] + " " + nameParts[1];
  }

  numberOnly(event): boolean {
    console.log(event);
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
