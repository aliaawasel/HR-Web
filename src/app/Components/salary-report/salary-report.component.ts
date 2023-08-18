import { SalaryService } from './../../../services/salary.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgModel } from '@angular/forms';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css'],
})
export class SalaryReportComponent implements OnInit {
  constructor(private SalaryService: SalaryService) {}
  ngOnInit(): void {
    this.getyears();
    this.getcurrent();
  }
  Salaries: any;
  years: number[] = [];
  currentMonth: any;
  currentYear: any;
  ViewMonth: any;
  ViewYear: any;
  search=""

  SalaryForm = new FormGroup({
    Month: new FormControl('', [Validators.required]),
    Year: new FormControl('', [Validators.required]),
  });

  getyears() {
    const currentYear = new Date().getFullYear();

    for (let year = 2008; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  getcurrent() {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.SalaryService.GetAllSalaries(
      this.currentMonth,
      this.currentYear
    ).subscribe((result: any) => {
      this.Salaries = result;
    });
  }

  View() {
    this.ViewMonth = this.SalaryForm.value.Month;
    (this.ViewYear = this.SalaryForm.value.Year),
      this.SalaryService.GetAllSalaries(
        this.ViewMonth,
        this.ViewYear
      ).subscribe((result: any) => {
        this.Salaries = result;
      });
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

  printRow(s: any): void {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <div class="tableStyle">
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
          <div class="table-responsive">
            <table class="table table-hover">
            <thead class="table-light text-center" dir="rtl">
            <title>Print Row</title>
          </thead>
          <body>
            <table>
              <thead>
                <tr>
                <th>صافي المرتب</th>
                <th>   </th>
                <th scope="col">اجمالي الخصم</th>
                <th>   </th>
                <th scope="col">اجمالي الاضافي</th>
                <th>   </th>
                <th scope="col">الخصم بالساعات</th>
                <th>   </th>
                <th scope="col">الاضافي بالساعات</th>
                <th>   </th>
                <th scope="col">عدد ايام الغياب</th>
                <th>   </th>
                <th scope="col">عدد ايام الحضور</th>
                <th>   </th>
                <th scope="col">الراتب الاساسي</th>
                <th>   </th>
                <th scope="col">اسم الموظف</th>
                <th>   </th>
                <th scope="col">القسم</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr>
                  <td>${s.actualSalary}</td>
                  <td>  </td>
                  <td>${s.totalSubs}</td>
                  <td>  </td>
                  <td>${s.totalAdds}</td>
                  <td>  </td>
                  <td>${s.subs}</td>
                  <td>  </td>
                  <td>${s.adds}</td>
                  <td>  </td>
                  <td>${s.absenceDays}</td>
                  <td>  </td>
                  <td>${s.attendanceDays}</td>
                  <td>  </td>
                  <td>${s.netSalary}</td>
                  <td></td>
                  <td>${s.employeeName}</td>
                  <td></td>
                  <td>${s.departmentName}</td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.print();
      printWindow.close();
    }
  }
}
