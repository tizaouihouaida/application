import { Component, OnInit } from "@angular/core";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/shared/models/User";
import { AuthService } from "src/app/shared/services/auth.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  usersCopy: User[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  userToDelete: User;
  isLoading = false;
  permissions: string[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.getUsers();
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getUsers() {
    this.isLoading = true;
    this.hasFilter = false;
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.isLoading = false;
        this.users = users;
        this.usersCopy = [...this.users];
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      },
    });
  }

  open(content, user: User) {
    this.deleteAlertMessage = `Are you sure you want to delete ${user.firstName} ${user.lastName}`;
    this.userToDelete = user;
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

  deleteUser() {
    this.isLoading = true;
    this.userService.deleteUser(this.userToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "User deleted successfully";
        this.getUsers();
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      },
    });
  }

  search(event: any) {
    let search = event.target.value;
    this.hasFilter = search ? true : false;
    this.users = [...this.usersCopy];
    this.users = this.users.filter(
      (user) =>
        user.firstName.includes(search) ||
        user.lastName.includes(search) ||
        user.email.includes(search) ||
        user.Role.name.includes(search)
    );
  }
}
