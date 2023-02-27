import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Profile } from "src/app/shared/models/Profile";
import { ProfileService } from "src/app/shared/services/profile.service";
import { mimeType } from "src/app/shared/validators/mimetype.validator";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = "";
  profileForm: FormGroup;
  profile: Profile;
  defaultImage: string = "assets/img/brand/default-user.jpg";
  imagePreview: string = "assets/img/brand/default-user.jpg";
  isSubmit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.initUserForm();
    this.getProfile();
  }

  initUserForm() {
    this.profileForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      image: [null, [Validators.required, mimeType]],
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({ image: file });
    this.profileForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getProfile() {
    this.profileService.getMyProfile().subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
        });

        profile.imageUrl
          ? (this.imagePreview = profile.imageUrl)
          : this.defaultImage;
      },
      error: (error) => {
        this.errorMessage = "an error occurred. Please try again";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  saveProfile() {
    this.profileService
      .updateMyProfile(
        this.profileForm.value.firstName,
        this.profileForm.value.lastName,
        this.profileForm.value.image
      )
      .subscribe({
        next: (data) => {
          this.getProfile();
          window.location.reload();
        },
        error: (error) => {
          this.errorMessage = "an error occurred. Please try again";
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
  }
}
