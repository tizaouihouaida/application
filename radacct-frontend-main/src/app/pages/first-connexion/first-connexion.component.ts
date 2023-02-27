import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FirstConnexion } from "src/app/shared/models/FirstConnexion";
import { FirstConnexionService } from "src/app/shared/services/first-connexion.service";

@Component({
  selector: "app-first-connexion",
  templateUrl: "./first-connexion.component.html",
  styleUrls: ["./first-connexion.component.scss"],
})
export class FirstConnexionComponent implements OnInit {
  searchForm: FormGroup;
  isLoading: boolean = false;
  clientFirstConnexion: FirstConnexion;
  errorMessage: string = "";
  constructor(private firstConnexionService: FirstConnexionService) {}

  ngOnInit(): void {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      telAdsl: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern("^[0-9]*$"),
      ]),
    });
  }

  getFirstConnexion() {
    this.isLoading = true;
    this.firstConnexionService
      .getFirstConnexion(+this.searchForm.value.telAdsl)
      .subscribe({
        next: (firstConnexion: FirstConnexion) => {
          this.isLoading = false;
          this.clientFirstConnexion = firstConnexion;
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.code === "client_not_found") {
            this.errorMessage = `client with ${this.searchForm.value.telAdsl} not found.`;
          } else {
            this.errorMessage = `An error occurred please try again, or contact the support`;
          }

          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
  }
}
