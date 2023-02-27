import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { fileExtensionValidator } from "./file-extension-validator.directive";
import { SuspensionService } from "src/app/shared/services/suspension.service";

@Component({
  selector: "app-suspenssion-upload",
  templateUrl: "./suspenssion-upload.component.html",
  styleUrls: ["./suspenssion-upload.component.scss"],
})
export class SuspenssionUploadComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  form: FormGroup;
  fileName: string;
  alertMessage: string = "";
  alertType: string;
  @Output() emitAlert: EventEmitter<{
    alertType: string;
    alertMessage: string;
  }> = new EventEmitter();
  constructor(private suspensionService: SuspensionService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      suspensionFile: new FormControl(null, {
        validators: [Validators.required, fileExtensionValidator()],
      }),
    });
  }

  onSelectFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileName = file.name;
    this.form.patchValue({ suspensionFile: file });
    this.form.get("suspensionFile").updateValueAndValidity();
    this.form.get("suspensionFile").markAsDirty();
  }

  uploadFile() {
    this.isLoading = true;
    this.suspensionService
      .uploadCsvFile(this.form.value.suspensionFile)
      .subscribe({
        next: (response: {
          message: string;
          rejectedClients: number[];
          clientsNotFound: number[];
          clientsAlreadyUploaded: number[];
          acceptedClientsLength: number;
        }) => {
          if (
            response.rejectedClients.length === 0 &&
            response.clientsNotFound.length === 0 &&
            response.clientsAlreadyUploaded.length === 0
          ) {
            this.alertType = "success";
            this.alertMessage = `${response.acceptedClientsLength} clients uploaded successfully`;
          } else {
            this.alertType = "warning";
            this.alertMessage = `* Clients uploaded number:  ${response.acceptedClientsLength}. \n`;
            if (response.rejectedClients.length > 0) {
              let rejectedClients = response.rejectedClients.join(", ");
              this.alertMessage += `* Clients already suspended:  ${rejectedClients}.\n`;
            }
            if (response.clientsNotFound.length > 0) {
              let notFoundClients = response.clientsNotFound.join(", ");
              this.alertMessage += `* Clients not found: ${notFoundClients}.\n`;
            }
            if (response.clientsAlreadyUploaded.length > 0) {
              let clientsAlreadyUploaded =
                response.clientsAlreadyUploaded.join(", ");
              this.alertMessage += `* Clients already uploaded: ${clientsAlreadyUploaded}.`;
            }
            this.alertMessage.replace("\n", "<br>");
            
            this.emitAlert.emit({
              alertType: this.alertType,
              alertMessage: this.alertMessage,
            });
          }
        },
        error: (error) => {
          this.alertType = "danger";
          this.alertMessage =
            "An error occurred, Please try again or contact the support.";
          this.emitAlert.emit({
            alertType: this.alertType,
            alertMessage: this.alertMessage,
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.emitAlert.emit({
      alertType: '',
      alertMessage: ''
    });
  }
}
