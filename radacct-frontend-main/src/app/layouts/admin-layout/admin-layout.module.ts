import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { RadacctComponent } from "../../pages/radacct/radacct.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { NgSelectModule } from "@ng-select/ng-select";
import { PermissionGuard } from "src/app/shared/guards/permission.guard";
import { SuspenssionUploadComponent } from "src/app/pages/suspenssion-upload/suspenssion-upload.component";
import { FirstConnexionComponent } from "src/app/pages/first-connexion/first-connexion.component";
import { UsersComponent } from "src/app/pages/users/users.component";
import { RolesComponent } from "src/app/pages/roles/roles.component";
import { AddUserComponent } from "src/app/pages/add-user/add-user.component";
import { AddRoleComponent } from "src/app/pages/add-role/add-role.component";
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SuspenssionComponent } from "src/app/pages/suspenssion/suspenssion.component";
import { SuspenssionListComponent } from "src/app/pages/suspenssion-list/suspenssion-list.component";
import { ModemComponent } from "src/app/pages/modem/modem.component";
import { CustomersComponent } from "src/app/pages/customers/customers.component";
import { AddCustomerComponent } from "src/app/pages/add-customer/add-customer.component";
import { ReactivationComponent } from "src/app/pages/reactivation/reactivation.component";
import { ReactivationUploadComponent } from "src/app/pages/reactivation-upload/reactivation-upload.component";
import { ReactivationListComponent } from "src/app/pages/reactivation-list/reactivation-list.component";
import { SuspendedListComponent } from "src/app/pages/suspended-list/suspended-list.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxPaginationModule,
    NgbAlertModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    RadacctComponent,
    UsersComponent,
    RolesComponent,
    AddUserComponent,
    AddRoleComponent,
    SuspenssionUploadComponent,
    SuspenssionListComponent,
    SuspenssionComponent,
    FirstConnexionComponent,
    ModemComponent,
    CustomersComponent,
    AddCustomerComponent,
    ReactivationComponent,
    ReactivationListComponent,
    ReactivationUploadComponent,
    SuspendedListComponent
  ],
  providers: [PermissionGuard],
})
export class AdminLayoutModule {}
