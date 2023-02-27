import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Modem } from "src/app/shared/models/Modem";
import { ModemService } from "src/app/shared/services/modem.service";

@Component({
  selector: "app-modem",
  templateUrl: "./modem.component.html",
  styleUrls: ["./modem.component.scss"],
})
export class ModemComponent implements OnInit {
  searchForm: FormGroup;
  isLoading: boolean = false;
  modem: Modem;
  errorMessage: string = "";
  constructor(private modemService: ModemService) {}

  ngOnInit(): void {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      filter: new FormControl("", [Validators.required]),
    });
  }

  filterModem() {
    this.modemService.filterModem(this.searchForm.value.filter).subscribe({
      next: (modem: Modem) => {
        this.modem = modem;
      },
      error: (error) => {
        this.errorMessage = "An error occurred. Please try again";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000)
      }
    });
  }
}
