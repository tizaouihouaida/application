import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs";
import { PermissionGroup } from "src/app/shared/models/PermissionGroup";
import { Role } from "src/app/shared/models/Role";
import { PermissionService } from "src/app/shared/services/permissions.service";
import { RoleService } from "src/app/shared/services/role.service";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.scss"],
})
export class AddRoleComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = "";
  mode: string = "create";
  role: Role;
  roleId: number;
  roleForm: FormGroup;
  permissionsGroup: PermissionGroup[] = [];
  selectedPermissions = new Map<number, boolean>();
  isSubmit: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initRoleForm();
    // this.getPermissions();
    this.patchForm();
  }

  initRoleForm() {
    this.roleForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  patchForm() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.mode = "edit";
        this.roleId = +paramMap.get("id");
        this.getPermissions();
        this.getRoleById();
      } else {
        this.mode = "create";
        this.getPermissions();
        this.roleId = null;
      }
    });
  }

  getRoleById() {
    this.roleService.getRoleById(this.roleId).subscribe({
      next: (role: Role) => {
        this.role = role;
        this.roleForm.patchValue({
          name: this.role.name,
          description: this.role.description,
        });
        for (const permission of this.role.Permissions) {
          this.selectedPermissions.set(permission.id, true);
        }
      },
      error: (error) => {
        this.errorMessage =
          "An error occurred. Please try again or contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  getPermissions() {
    this.isLoading = true;
    this.permissionService.getPermissions().subscribe({
      next: (permissionsGroup: PermissionGroup[]) => {
        this.isLoading = false;
        this.permissionsGroup = permissionsGroup;
        for (const permissionGroup of this.permissionsGroup) {
          permissionGroup.Permissions.sort(
            (firstPermission, secondPermission) =>
              firstPermission.name == secondPermission.name
                ? 0
                : firstPermission.name < secondPermission.name
                ? -1
                : 1
          );
          for (const permission of permissionGroup.Permissions) {
            this.selectedPermissions.set(permission.id, false);
          }
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          "An error occurred. Please try again or contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  setAll(index: number) {
    let permissions = this.permissionsGroup[index].Permissions;
    let statusWillBe = this.isAllPermissionsSelected(index) ? false : true;
    for (const permission of permissions) {
      this.selectedPermissions.set(permission.id, statusWillBe);
    }
  }

  isAllPermissionsSelected(permissionGroupIndex: number) {
    let isAllSelected = true;
    let permissions = this.permissionsGroup[permissionGroupIndex].Permissions;
    for (const permission of permissions) {
      if (!this.selectedPermissions.get(permission.id)) {
        isAllSelected = false;
      }
    }
    return isAllSelected;
  }

  setPermission(permissionGroupIndex: number, permissionIndex: number) {
    let permissionId =
      this.permissionsGroup[permissionGroupIndex].Permissions[permissionIndex]
        .id;
    this.selectedPermissions.set(
      permissionId,
      !this.selectedPermissions.get(permissionId)
    );
  }

  saveRole() {
    this.isSubmit = true;
    this.isLoading = true;
    if(this.roleForm.invalid) {
      this.isLoading = false;
      return;
    }
    let permissions: number[] = []
    let keys = Array.from(this.selectedPermissions.keys());
    for (const key of keys) {
      if(this.selectedPermissions.get(key)) {
        permissions.push(key);
      }
    }
    
    
    if (permissions.length === 0) {
      this.isLoading = false;
      this.errorMessage = "Please select at least one permission";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
      return;
    }

    let obs$: Observable<{ message: string }>;
    if (this.mode === "create") {
      obs$ = this.roleService.createRole({
        ...this.roleForm.value,
        permissions: permissions,
      });
    } else {
      obs$ = this.roleService.editRole(this.roleId, {
        ...this.roleForm.value,
        permissions,
      });
    }

    obs$.subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(["/roles"]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred Please try again!";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }
}
