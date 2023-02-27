import { AbstractControl, ValidatorFn } from "@angular/forms";

export function fileExtensionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = true;
    if (control.value) {
      const fileExt = control.value.name.split(".").pop();
      if (fileExt.toLowerCase() === "csv") {
        forbidden = false;
      }
    }

    return forbidden ? { invalidExt: true } : null;
  };
}
