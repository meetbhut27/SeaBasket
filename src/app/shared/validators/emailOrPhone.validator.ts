import { FormControl, ValidationErrors, Validators } from '@angular/forms';

export function emailOrPhone(): ValidationErrors | null {
    return (control: FormControl) => {
        const value = control.value;

        const pattern1 = Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
        const pattern2 = Validators.pattern('^[0-9]{10}$');

        if (!value || value === '') {
            return null;
        }

        const pattern1Valid = pattern1(control) === null;
        const pattern2Valid = pattern2(control) === null;

        return pattern1Valid || pattern2Valid ? null : { notEmailOrPhone: true };
    };
}
