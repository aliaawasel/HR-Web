import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './../../../services/department.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  Departments: any;
  SelectedDeptID: any;
  isEdited: boolean = false;
  AddedBefore: boolean = false;

  ngOnInit(): void {
    this.GetDepartments();
    this.nameExist=false;
  }
  constructor(private DepartmentService: DepartmentService) {}
  DepartmentForm = new FormGroup({
    DeptName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get getDeptName() {
    return this.DepartmentForm.controls['DeptName'];
  }

  GetDepartments() {
    this.DepartmentService.GetAllDepts().subscribe((result: any) => {
      this.Departments = result;
    });
  }
  AddDepartment() {
    const Dept = {
      name: this.DepartmentForm.value.DeptName,
    };
    this.DepartmentService.InsertDept(Dept).subscribe((result: any) => {
      this.ngOnInit();
      if (result != null) {
        const jsonString = JSON.stringify(result); // Convert object to JSON string
        const parsedData = JSON.parse(jsonString);
        if ((parsedData.message = 'AddedBefore')) {
          this.AddedBefore = true;
        }
      }
      if (result == null) {
        this.AddedBefore = false;
      }
      console.log(result);
    });
  }

  DeleteDepartment() {
    return this.DepartmentService.DeleteDept(this.selectedID).subscribe(() => {
      this.ngOnInit();
    });
  }
  UpdateDepartment(id: number) {
    this.SelectedDeptID = id;
    this.isEdited = true;
    this.DepartmentService.GetByDept(id).subscribe((result: any) => {
      const Dept = result;
      this.DepartmentForm.patchValue({
        DeptName: result.name,
      });

      this.ngOnInit();
    });
  }
  SaveUpdate() {
    const Dept = {
      id: this.SelectedDeptID,
      name: this.DepartmentForm.value.DeptName,
    };
    this.DepartmentService.EditDept(Dept).subscribe(() => {
      this.ngOnInit();
    });
    this.DepartmentForm.reset();
    this.isEdited = false;
  }

  selectedID: any;
  SelectID(id: number) {
    this.selectedID = id;
  }

  nameExist: boolean = false;

  checkDeptExist(name: string) {
    this.DepartmentService.CheckDept(this.selectedID, name).subscribe(
      (result: any) => {
        if (result != null) {
          const jsonString = JSON.stringify(result); // Convert object to JSON string
          const parsedData = JSON.parse(jsonString);
          console.log(parsedData.message);
          if ((parsedData.message = 'NameExist')) {
            this.nameExist = true;
          }
        }
        if (result == null) {
          this.nameExist = false;
        }
      }
    );
  }


  formHandler(e: any) {}
}
