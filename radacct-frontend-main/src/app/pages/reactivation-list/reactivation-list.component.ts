import { Component, OnInit } from '@angular/core';
import { ReactivationService } from 'src/app/shared/services/reactivation.service';

@Component({
  selector: 'app-reactivation-list',
  templateUrl: './reactivation-list.component.html',
  styleUrls: ['./reactivation-list.component.scss']
})
export class ReactivationListComponent implements OnInit {
  clientsWillReactivate: any[] = [];
  clientsWillReactivateCopy: any[] = [];
  isLoading: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  isFilter: boolean = false;
  constructor(private reactivationService: ReactivationService) { }

  ngOnInit(): void {
    this.getClientsWillReactivate();
  }

  getClientsWillReactivate() {
    this.isLoading = true;
    this.isFilter = false;
    this.reactivationService.getClientsWillReactivate().subscribe({
      next: (clientsWillReactivate) => {
        this.isLoading = false;
        this.clientsWillReactivate = clientsWillReactivate;        
        this.clientsWillReactivateCopy = [...this.clientsWillReactivate];
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
    this.clientsWillReactivate = [...this.clientsWillReactivateCopy];
    this.clientsWillReactivate = this.clientsWillReactivate.filter(
      (client) =>
        client.mac.toLowerCase().includes(searchString) ||
        client.tel_adsl.toLowerCase().includes(searchString)
    );
  }

}
