import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;
  hasError = false;
  errorMessage = "";
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.authService.clearAuthData();
    // this.authStatusSub = this.authService
    //   .getAuthStatusListener()
    //   .subscribe((authStatus) => {
    //     this.isLoading = false;
    //   });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.hasError = true;
      this.errorMessage = "Email and password are required!";
      setTimeout(() => {
        this.hasError = false;
      }, 5000);
      return;
    }
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          const token = response.token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.authService.saveAuthData(
              token,
              expirationDate,
              response.permissions
            );
            this.router.navigate(["/dashboard"]);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = "Invalid email or password";
          setTimeout(() => {
            this.hasError = false;
          }, 5000);
        },
      });
  }
}
