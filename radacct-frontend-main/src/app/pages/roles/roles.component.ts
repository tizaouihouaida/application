import { Component, OnInit } from "@angular/core";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { Role } from "src/app/shared/models/Role";
import { AuthService } from "src/app/shared/services/auth.service";
import { RoleService } from "src/app/shared/services/role.service";
import { Permission } from "src/app/shared/models/Permission";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  rolesCopy: Role[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  isLoading: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";
  deleteAlertMessage: string = "";
  roleToDelete: Role;
  permissions: string[] = [];
  permissionsToView: string[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;

  constructor(
    private roleService: RoleService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.getRoles();
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getRoles() {
    this.isLoading = true;
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.isLoading = false;
        this.roles = roles;
        this.rolesCopy = [...this.roles];
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          "An error occurred, Please try again or contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  deleteRole() {
    this.isLoading = true;
    this.roleService.deleteRole(this.roleToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.getRoles();
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error.message === "user_has_this_role") {
          this.errorMessage =
            "can't delete this role because exist user has it";
        } else {
          this.errorMessage =
            "An error occurred, Please try again or contact the support";
        }
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  open(content, role: Role) {
    this.deleteAlertMessage = `Are you sure you want to delete ${role.name} Role`;
    this.roleToDelete = role;
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  showPermissions(content, role: Role) {
    this.permissionsToView = [];
    for (const permission of role.Permissions) {
      this.permissionsToView.push(
        permission.key.split("_").join(" ").toLowerCase()
      );
    }
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

  search(event: any) {
    let search = event.target.value;
    this.hasFilter = search ? true : false;
    this.roles = [...this.rolesCopy];
    this.roles = this.roles.filter(
      (role) => role.name.includes(search) || role.description.includes(search)
    );
  }
}
