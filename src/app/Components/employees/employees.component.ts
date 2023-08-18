import { DepartmentService } from './../../../services/department.service';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

function ageValidator(
  birthDate: FormControl
): { [key: string]: boolean } | null {
  if (birthDate.value) {
    const today = new Date();
    const BD = new Date(birthDate.value);
    const age = today.getFullYear() - BD.getFullYear();
    // Check if age is less than 18
    if (age < 20) {
      return { ageInvalid: true };
    }
  }
  return null;
}


function hireValidator(
  HireDate: FormControl
): { [key: string]: boolean } | null {
  if (HireDate.value) {
    const hire = new Date(HireDate.value);
    const date = hire.getFullYear();

    // Check if age is less than 18
    if (date < 2008) {
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
  TimeErr:boolean=false;

  formHandler(e: any) {
  }
  ngOnInit(): void {
    this.GetAllEmployees();
    this.GetAllDepartments();
  }
  constructor(
    private EmployeeService: EmployeeService,
    private DepartmentService: DepartmentService
  ) {}

  EmployeeForm = new FormGroup({
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
    NationalId: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{14}$'),
    ]),
    Nationality: new FormControl('', [Validators.required]),
    HireDate: new FormControl('', [Validators.required, hireValidator]),
    Salary: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    CheckinTime: new FormControl('', [Validators.required]),
    CheckoutTime: new FormControl('', [Validators.required]),
  });

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
    this.EmployeeService.GetAllEmps().subscribe(
      (result: any) => (this.Employees = result)
    );
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
      console.log(Emp)
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
        HireDate: new Date(Emp.hireDate).getDate.toString(),
        CheckinTime: Emp.startTime,
        CheckoutTime: Emp.endTime
        // startTime:this.EmployeeForm.value.CheckinTime,
        // endTime:this.EmployeeForm.value.CheckoutTime,
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
      // startTime:this.EmployeeForm.value.CheckinTime,
      // endTime:this.EmployeeForm.value.CheckoutTime,
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
    this.EmployeeForm.reset();
    this.isEdited = false;
  }
  SelectID(id:number){
    this.selectedId=id;
  }
}
