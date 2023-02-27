import { Component, OnInit } from "@angular/core";
import { ClientWillSuspend } from "src/app/shared/models/ClientWillSuspend";
import { SuspensionService } from "src/app/shared/services/suspension.service";

@Component({
  selector: "app-suspenssion-list",
  templateUrl: "./suspenssion-list.component.html",
  styleUrls: ["./suspenssion-list.component.scss"],
})
export class SuspenssionListComponent implements OnInit {
  clientsWillSuspend: ClientWillSuspend[] = [];
  clientsWillSuspendCopy: ClientWillSuspend[] = [];
  isLoading: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  isFilter: boolean = false;
  constructor(private suspensionService: SuspensionService) {}

  ngOnInit(): void {
    this.getClientsWillSuspend();
  }

  getClientsWillSuspend() {
    this.isLoading = true;
    this.isFilter = false;
    this.suspensionService.getClientsWillSuspend().subscribe({
      next: (clientsWillSuspend) => {
        this.isLoading = false;
        this.clientsWillSuspend = clientsWillSuspend;
        this.clientsWillSuspendCopy = [...this.clientsWillSuspend];
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  searchClient(event) {
    this.isFilter = true;
    let searchString = event.target.value.trim().toLowerCase(); 
    this.clientsWillSuspend = [...this.clientsWillSuspendCopy];
    this.clientsWillSuspend = this.clientsWillSuspend.filter(
      (client) =>
        client.mac.toLowerCase().includes(searchString) ||
        client.tel_adsl.toLowerCase().includes(searchString)
    );
  }
}
