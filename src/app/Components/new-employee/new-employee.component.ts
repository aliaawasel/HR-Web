import { DepartmentService } from 'src/services/department.service';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private EmployeeService:EmployeeService, private DepartmentService:DepartmentService) {

  }
  Departments:any


  ngOnInit(): void {
    this.GetAllDepartments();
  }

  EmployeeForm=new FormGroup({
    EmpName:new FormControl ('',[Validators.required]),
    Address:new FormControl ('',[Validators.required]),
    Phone:new FormControl ('',[Validators.required]),
    Gender:new FormControl ('',[Validators.required]),
    Birthdate:new FormControl('',[Validators.required]),
    Department:new FormControl ('',[Validators.required]),
    NationalId: new FormControl('',[Validators.required]),
    Nationality:new FormControl('',[Validators.required]),
    HireDate:new FormControl('',[Validators.required]),
    Salary:new FormControl('',[Validators.required]),
    CheckinTime:new FormControl('',[Validators.required]),
    CheckoutTime:new FormControl('',[Validators.required])
  });

  GetAllDepartments(){
    this.DepartmentService.GetAllDepts().subscribe((result:any)=>{
    this.Departments=result}
    )
   }

  AddEmployee(){
    const Emp={
      name:this.EmployeeForm.value.EmpName,
      address:this.EmployeeForm.value.Address,
      gender:this.EmployeeForm.value.Gender,
      nationality:this.EmployeeForm.value.Nationality,
      phone:this.EmployeeForm.value.Phone,
      nationalID:this.EmployeeForm.value.NationalId,
      birthDate:this.EmployeeForm.value.Birthdate,
      salary:this.EmployeeForm.value.Salary,
      hireDate:this.EmployeeForm.value.HireDate,
      startTime:`${this.EmployeeForm.value.CheckinTime}:00`,
      endTime:`${this.EmployeeForm.value.CheckoutTime}:00`,
      // startTime:this.EmployeeForm.value.CheckinTime,
      // endTime:this.EmployeeForm.value.CheckoutTime,
      deptid:this.EmployeeForm.value.Department,
    }
    console.log(Emp)
    this.EmployeeService.AddEmp(Emp).subscribe(()=>{
      this.ngOnInit();
      this.EmployeeForm.reset();
    })
   }

}
