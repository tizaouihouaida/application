import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

export function GreaterThanToday(control: AbstractControl) {
  const sourceCtrl = control.value;
  const todayTime = new Date().getTime();
  if(sourceCtrl) {
    let sourceCtrlTime = new Date(sourceCtrl).getTime();
    return sourceCtrlTime > todayTime ? { greaterThanTodayError: true } : null;
  }
  return null;
  
}

export class DateValidator {
  static startDateGreaterThanEndDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let startDAte = control.get("startDate").value;
      let endDate = control.get("endDate").value;
      if (startDAte && endDate) {
        return new Date(startDAte) > new Date(endDate)
          ? { startDateGreaterThanEndDate: true }
          : null;
      }
      return null;
    };
  }
}

