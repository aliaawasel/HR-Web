import { DepartmentService } from './../../../services/department.service';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormBuilder,
} from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source)?.value;
      const targetCtrl = control.get(target)?.value;
      const birthdayYear = Number(sourceCtrl?.substring(2, 4));
      const birthdayMonth = Number(sourceCtrl?.substring(5, 7));
      const birthdayDay = Number(sourceCtrl?.substring(8, 10));

      const nationalIdYear = Number(targetCtrl?.substring(1, 3));
      const nationalIdMonth = Number(targetCtrl?.substring(3, 5));
      const nationalIdDay = Number(targetCtrl?.substring(5, 7));

      if (
        nationalIdYear !== birthdayYear ||
        nationalIdMonth !== birthdayMonth ||
        nationalIdDay !== birthdayDay
      ) {
        return { mismatch: true };
      } else {
        return null;
      }
    };
  }
// HireDate with BirthDate Validation
  static hireDateValidation(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source)?.value;
      const targetCtrl = control.get(target)?.value;
      const hire = new Date(sourceCtrl);
      const birth = new Date(targetCtrl);

      let timeDiff = Math.abs(hire.getTime() - birth.getTime());
      let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

      if (age < 20) {
        return { AgeDateInvalid: true };
      } else {
        return null;
      }
    };
  }
}


// BirthDate Vaildation
function ageValidator(
  birthDate: FormControl
): { [key: string]: boolean } | null {
  if (birthDate.value) {
    const BD = new Date(birthDate.value);
    let timeDiff = Math.abs(Date.now() - BD.getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    // Check if age is less than 18
    if (age < 20) {
      return { ageInvalid: true };
    }
  }
  return null;
}


// National Id validation
function NationalValidator(
  NationalId: FormControl
): { [key: string]: any } | null {
  const patterns = [
    { pattern: /^(2|3){1}[0-9]{2,3}/, message: 'خطأ في السنة' },
    { pattern: /^\d{3}(0[1-9]|1[0-2])/, message: 'خطأ في الشهر' },
    { pattern: /^\d{5}(0[1-9]|1[0-9]|2[0-9]|3(0|1))/, message: 'خطأ في اليوم' },
    {
      pattern: /^\d{7}(0[1-9]|1[0-9]|2[0-9]|3[0-5])/,
      message: 'خطأ في كود المحافظه',
    },
    // Add more patterns and messages here
  ];
  if (NationalId.value == '' || NationalId.value == null) {
    return { requiredError: `من فضلك ادخل الرقم القومي` };
  }
  const minLength = 14; // Minimum length required for NationalId

  if (NationalId.value && NationalId.value.length < minLength) {
    return { lengthError: `الرقم القومي يجب أن يتكون من ${minLength} أرقام` };
  }

  for (const pattern of patterns) {
    const regex = new RegExp(pattern.pattern);
    if (!regex.test(NationalId.value)) {
      return { patternError: pattern.message };
    }
  }
  return null;
}


// hireDate year validation
function hireValidator(
  HireDate: FormControl
): { [key: string]: boolean } | null {
  if (HireDate.value) {
    const hire = new Date(HireDate.value);
    const date = hire.getFullYear();

    if (date < 2009) {
      return { DateInvalid: true };
    }
  }
  return null;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  Employees: any;
  Departments: any;
  selectedId: any;
  isEdited: boolean = false;
  TimeErr: boolean = false;
  maxBDate: any;
  maxHireDate: any;
  formHandler(e: any) {}
  ngOnInit(): void {
    this.GetAllEmployees();
    this.GetAllDepartments();

    const currentDate = new Date();
    this.maxHireDate = currentDate.toISOString().split('T')[0];
    this.maxBDate = new Date();
    this.maxBDate.setFullYear(currentDate.getFullYear() - 20);
    this.maxBDate = this.maxBDate.toISOString().split('T')[0];
    console.log(this.maxBDate);
  }

  constructor(
    private EmployeeService: EmployeeService,
    private DepartmentService: DepartmentService
  ) {}

  EmployeeForm = new FormGroup(
    {
      EmpName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      Address: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(010|011|012)[0-9]{8}$'),
      ]),
      Gender: new FormControl('', [Validators.required]),
      Birthdate: new FormControl('', [Validators.required, ageValidator]),
      Department: new FormControl('', [Validators.required]),
      NationalId: new FormControl('', [Validators.required, NationalValidator]),
      Nationality: new FormControl('', [Validators.required]),
      HireDate: new FormControl('', [Validators.required, hireValidator]),
      Salary: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      CheckinTime: new FormControl('', [Validators.required]),
      CheckoutTime: new FormControl('', [Validators.required]),
    },
    [
      CustomValidators.MatchValidator('Birthdate', 'NationalId'),
      CustomValidators.hireDateValidation('HireDate', 'Birthdate'),
    ]
  );

  get EmpName() {
    return this.EmployeeForm.controls['EmpName'];
  }
  get Address() {
    return this.EmployeeForm.controls['Address'];
  }
  get Phone() {
    return this.EmployeeForm.controls['Phone'];
  }
  get Gender() {
    return this.EmployeeForm.controls['Gender'];
  }
  get Birthdate() {
    return this.EmployeeForm.controls['Birthdate'];
  }
  get Department() {
    return this.EmployeeForm.controls['Department'];
  }
  get NationalId() {
    return this.EmployeeForm.controls['NationalId'];
  }
  get Nationality() {
    return this.EmployeeForm.controls['Nationality'];
  }
  get HireDate() {
    return this.EmployeeForm.controls['HireDate'];
  }
  get Salary() {
    return this.EmployeeForm.controls['Salary'];
  }
  get CheckinTime() {
    return this.EmployeeForm.controls['CheckinTime'];
  }
  get CheckoutTime() {
    return this.EmployeeForm.controls['CheckoutTime'];
  }

  GetAllDepartments() {
    this.DepartmentService.GetAllDepts().subscribe(
      (result: any) => (this.Departments = result)
    );
  }

  GetAllEmployees() {
    this.EmployeeService.GetAllEmps().subscribe((result: any) => {
      this.Employees = result;
    });
  }

  AddEmployee() {
    this.isEdited = true;
    const Emp = {
      name: this.EmployeeForm.value.EmpName,
      address: this.EmployeeForm.value.Address,
      gender: this.EmployeeForm.value.Gender,
      nationality: this.EmployeeForm.value.Nationality,
      phone: this.EmployeeForm.value.Phone,
      nationalID: this.EmployeeForm.value.NationalId,
      birthDate: this.EmployeeForm.value.Birthdate,
      salary: this.EmployeeForm.value.Salary,
      hireDate: this.EmployeeForm.value.HireDate,
      startTime: `${this.EmployeeForm.value.CheckinTime}:00`,
      endTime: `${this.EmployeeForm.value.CheckoutTime}:00`,
      // startTime:this.EmployeeForm.value.CheckinTime,
      // endTime:this.EmployeeForm.value.CheckoutTime,
      deptid: this.EmployeeForm.value.Department,
    };
    this.EmployeeService.AddEmp(Emp).subscribe(() => {
      this.ngOnInit();
      this.EmployeeForm.reset();
      console.log(Emp);
    });
  }
  DeleteEmp() {
    this.EmployeeService.DeleteEmp(this.selectedId).subscribe(() => {
      this.ngOnInit();
    });
  }
  UpdateEmp(id: number) {
    this.isEdited = true;
    this.selectedId = id;
    this.EmployeeService.GetEmpByID(id).subscribe((result: any) => {
      const Emp = result;
      this.EmployeeForm.patchValue({
        EmpName: Emp.name,
        Department: Emp.deptID,
        Address: Emp.address,
        Gender: Emp.gender,
        Nationality: Emp.nationality,
        Phone: Emp.phone,
        NationalId: Emp.nationalID,
        Birthdate: Emp.birthDate,
        Salary: Emp.salary,
        HireDate: Emp.hireDate,
        CheckinTime: Emp.startTime,
        CheckoutTime: Emp.endTime,
      });
    });
  }

  SaveEdite() {
    const Emp = {
      id: this.selectedId,
      name: this.EmployeeForm.value.EmpName,
      address: this.EmployeeForm.value.Address,
      gender: this.EmployeeForm.value.Gender,
      nationality: this.EmployeeForm.value.Nationality,
      phone: this.EmployeeForm.value.Phone,
      nationalID: this.EmployeeForm.value.NationalId,
      birthDate: this.EmployeeForm.value.Birthdate,
      salary: this.EmployeeForm.value.Salary,
      hireDate: this.EmployeeForm.value.HireDate,
      startTime: `${this.EmployeeForm.value.CheckinTime}`,
      endTime: `${this.EmployeeForm.value.CheckoutTime}`,
      deptid: Number(this.EmployeeForm.value.Department),
    };
    console.log(Emp);
    this.EmployeeService.EditEmp(Emp).subscribe(() => {
      this.ngOnInit();
      this.EmployeeForm.reset();
    });
    this.isEdited = false;
    this.EmployeeForm.reset();
  }

  back() {
    this.EmpName.reset();
    this.Address.reset();
    this.Gender.reset();
    this.Phone.reset();
    this.Birthdate.reset();
    this.Nationality.reset();
    this.NationalId.reset();
    this.Department.reset();
    this.HireDate.reset();
    this.Salary.reset();
    this.isEdited = false;
  }
  SelectID(id: number) {
    this.selectedId = id;
  }
  // DateInvalid: boolean = false;
  // hire: any;
  // birthDate: any;

  // hireDateValidation() {
  //   const hire = new Date(this.hire);
  //   const birth = new Date(this.birthDate);

  //   // Calculate age at the time of hiring

  //   let timeDiff = Math.abs(hire.getTime() - birth.getTime());
  //   let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  //   console.log(age);

  //   if (age < 20) {
  //     // Check if age at hiring is less than 20
  //     this.DateInvalid = true;
  //   } else {
  //     this.DateInvalid = false;
  //   }
  // }

  // NationalIDInvalid: boolean = false;
  // Nid: any;

  // NationalIDValidation() {
  //   const birthdayYear = Number(this.birthDate.substring(2, 4));
  //   const birthdayMonth = Number(this.birthDate.substring(5, 7));
  //   const birthdayDay = Number(this.birthDate.substring(8, 10));

  //   // Extract the year, month, and day from the national ID
  //   const nationalIdYear = Number(this.Nid.substring(1, 3));
  //   const nationalIdMonth = Number(this.Nid.substring(3, 5));
  //   const nationalIdDay = Number(this.Nid.substring(5, 7));

  //   // Perform the validation by comparing the values
  //   if (
  //     nationalIdYear !== birthdayYear ||
  //     nationalIdMonth !== birthdayMonth ||
  //     nationalIdDay !== birthdayDay
  //   ) {
  //     this.NationalIDInvalid = true;
  //   } else {
  //     this.NationalIDInvalid = false;
  //   }
  // }
}
