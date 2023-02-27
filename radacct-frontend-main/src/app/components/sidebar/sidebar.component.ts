import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/users",
    title: "Users",
    icon: "ni-single-02 text-primary",
    class: "",
    permission: "PERMISSION_LIST_USERS",
  },
  {
    path: "/roles",
    title: "Roles",
    icon: "ni-paper-diploma text-info",
    class: "",
    permission: "PERMISSION_LIST_ROLES",
  },
  {
    path: "/radacct",
    title: "Radacct",
    icon: "ni-bullet-list-67 text-success",
    class: "",
    permission: "PERMISSION_LIST_RADACCT",
  },
  {
    path: '/first-connexion',
    title: 'First Connexion',
    icon: 'ni-watch-time ',
    class: '',
    permission: 'PERMISSION_SEARCH_FIRST_CONNEXION'
  },
  {
    path: '/reactivation',
    title: 'Reactivation',
    icon: 'ni-air-baloon text-success',
    class: '',
    permission: 'PERMISSION_UPLOAD_SUSPENSION'
  },
  {
    path: '/suspension',
    title: 'Suspension',
    icon: 'ni-scissors text-danger',
    class: '',
    permission: 'PERMISSION_UPLOAD_SUSPENSION'
  },
  {
    path: "/modem",
    title: "Modem",
    icon: "ni-world-2 text-info",
    class: "",
    permission: "PERMISSION_SEARCH_MODEM"
  },
  {
    path: "/customers",
    title: "Customer Management",
    icon: "ni-circle-08 text-primary",
    class: "",
    permission: "PERMISSION_SEARCH_MODEM"
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  permissions: string[];
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.permissions = this.authService.getPermissions();

    this.menuItems = ROUTES.filter((menuItem) =>
      this.permissions.includes(menuItem.permission)
    );
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.authService.logout();
  }
}
