import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './../../../services/department.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  Departments:any
  SelectedDeptID:any
  isEdited:boolean=false
  ngOnInit(): void {
    this.GetDepartments();
  }
  constructor(private DepartmentService:DepartmentService) {}
  DepartmentForm=new FormGroup({
    DeptName:new FormControl ('',[Validators.required,Validators.minLength(3)])
  })

  get getDeptName(){
    return  this.DepartmentForm.controls['DeptName']
  }

  GetDepartments(){
    this.DepartmentService.GetAllDepts().subscribe((result:any)=>{
      this.Departments=result
    })
  }
    AddDepartment(){
      const Dept={
        name:this.DepartmentForm.value.DeptName
      }
      this.DepartmentService.InsertDept(Dept).subscribe(()=>{
         this.ngOnInit()
         this.DepartmentForm.reset();
      });
    }

    DeleteDepartment(id:number){
      return this.DepartmentService.DeleteDept(id).subscribe(()=>{
        this.ngOnInit();
      })
    }
    UpdateDepartment(id:number){
      this.SelectedDeptID=id
      this.isEdited=true
      this.DepartmentService.GetByDept(id).subscribe((result:any)=>{
        const dept=result
        this.DepartmentForm.patchValue({
          DeptName:dept.name
        })
      })
    }
    SaveUpdate(){
      const Dept={
        id:this.SelectedDeptID,
        name:this.DepartmentForm.value.DeptName
      }
      this.DepartmentService.EditDept(Dept).subscribe(()=>{
        this.ngOnInit();
      })
      this.DepartmentForm.reset();
      this.isEdited=false
        }

        formHandler(e:any){

        }


}
