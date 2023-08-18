import { EmployeeService } from './../../../services/employee.service';
import { DepartmentService } from 'src/services/department.service';
import { AttendanceReportService } from './../../../services/attendance-report.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { count } from 'rxjs';

// function ViewbyDate(
//   DateFrom: FormControl,
//   DateTo: FormControl
// ): { [key: string]: boolean } | null {
//   if (DateFrom.value && DateTo.value) {
//     const From = new Date(DateFrom.value);
//     const To = new Date(DateTo.value);
//     if (To.getFullYear() < From.getFullYear()) {
//       return { DateInvalid: true };
//     } else if (To.getMonth() < From.getMonth()) {
//       return { DateInvalid: true };
//     } else if (To.getDay() < From.getDay()) {
//       return { DateInvalid: true };
//     }
//   }
//   return null;
// }
@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css'],
})
export class AttendanceReportComponent implements OnInit {
  constructor(
    private AttendanceReportService: AttendanceReportService,
    private DepartmentService: DepartmentService,
    private EmployeeService: EmployeeService
  ) {}
  Attendances: any;
  Departments: any;
  Emps: any;
  DeptID: any;
  isEdited: boolean = false;
  AddedBefore: boolean = false;
  selectedID: any;
  searchValidation: boolean = true;
  ngOnInit() {
    this.GetAllDepartments();
    this.GetEmpAllAttendaces();
  }

  AttendanceForm = new FormGroup({
    EmpName: new FormControl('', [Validators.required]),
    DeptName: new FormControl('', [Validators.required]),
    CheckinTime: new FormControl('', [Validators.required]),
    Date: new FormControl('', [Validators.required]),
    CheckoutTime: new FormControl('', [Validators.required]),
  });

  FilterForm = new FormGroup({
    searchName: new FormControl('', [Validators.required]),
    DateFrom: new FormControl('', [Validators.required]),
    DateTo: new FormControl('', [Validators.required]),
  });

  get EmpName() {
    return this.AttendanceForm.controls['EmpName'];
  }
  get DeptName() {
    return this.AttendanceForm.controls['DeptName'];
  }
  get CheckinTime() {
    return this.AttendanceForm.controls['CheckinTime'];
  }
  get Date() {
    return this.AttendanceForm.controls['Date'];
  }
  get CheckoutTime() {
    return this.AttendanceForm.controls['CheckoutTime'];
  }
  get searchName() {
    return this.FilterForm.controls['searchName'];
  }
  get DateFrom() {
    return this.FilterForm.controls['DateFrom'];
  }
  get DateTo() {
    return this.FilterForm.controls['DateTo'];
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.AttendanceReportService.Uploadfile(formData).subscribe(() => {
      this.ngOnInit();
    });
  }

  GetAllDepartments() {
    this.DepartmentService.GetAllDepts().subscribe((result: any) => {
      this.Departments = result;
    });
  }

  GetEmpsByDept() {
    this.DeptID = this.AttendanceForm.value.DeptName;
    this.EmployeeService.GetEmpByDept(this.DeptID).subscribe((result: any) => {
      this.Emps = result;
    });
  }

  AddAttendance() {
    const Attendance = {
      checkIn: `${this.AttendanceForm.value.CheckinTime}:00`,
      checkout: `${this.AttendanceForm.value.CheckoutTime}:00`,
      date: this.AttendanceForm.value.Date,
      empId: this.AttendanceForm.value.EmpName,
    };
    this.AttendanceReportService.AddAttendances(Attendance).subscribe(
      (result: any) => {
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
      }
    );
  }

  DeleteAttendance(id: number) {
    this.AttendanceReportService.DeleteAttendance(id).subscribe(() => {
      this.ngOnInit();
    });
  }




  GetEmpAllAttendaces() {
    this.AttendanceReportService.GetAllAttendances().subscribe(
      (result: any) => {
        console.log(result.length)
        this.Attendances = result;
      }
    );
  }



  GetByName(name: string) {
    this.AttendanceReportService.GetByName(name).subscribe((rseult: any) => {
      this.Attendances = rseult;
      if (this.Attendances.length == 0) {
        this.searchValidation = false;
      } else {
        this.searchValidation = true;
      }
    });
  }

  GetByDate(date1: string, date2: string) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (date1 != '' && date2 != '') {
      if (d1.getDate() > d2.getDate()) {
        this.searchValidation = false;
      } else {
        this.searchValidation = true;
      }
      this.AttendanceReportService.GetByDate(date1, date2).subscribe(
        (rseult: any) => {
          this.Attendances = rseult;
        }
      );
    } else {
      this.searchValidation = false;
    }
  }

  printPage() {
    const printableSection = document.getElementById('prinatabletable');
    if (printableSection) {
      const printContents = printableSection.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  }
  back() {
    this.AttendanceForm.reset();
    this.isEdited = false;
  }
  Edit(id: number) {
    this.isEdited = true;
    this.selectedID = id;
    this.AttendanceReportService.GetAttendancById(id).subscribe(
      (result: any) => {
        const attendance = result;
        console.log(result);
        this.AttendanceForm.patchValue({
          CheckinTime: attendance.checkIn,
          CheckoutTime: attendance.checkOut,
          Date: new Date(attendance.date).getDate.toString(),
          DeptName: attendance.deptId,
          EmpName: attendance.empId,
        });
        this.GetEmpsByDept();
      }
    );
  }

  SaveEdite() {
    const Attendance = {
      id: this.selectedID,
      checkIn: `${this.AttendanceForm.value.CheckinTime}`,
      checkout: `${this.AttendanceForm.value.CheckoutTime}`,
      date: this.AttendanceForm.value.Date,
      empId: this.AttendanceForm.value.EmpName,
    };
    console.log(Attendance);
    this.AttendanceReportService.UpdateAttendance(Attendance).subscribe(() => {
      this.ngOnInit();
    });
  }



  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [6, 6, 9, 12];


  onTableDataChange(event: any) {
    this.page = event;
    this.GetEmpAllAttendaces();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.GetEmpAllAttendaces();
  }
}
