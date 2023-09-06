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
  search = '';

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
    const printWindow = window.open('');
    if (printWindow) {
      printWindow.document.write(`
      <html>
      <head>
        <style>
          .container {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
          }
          .tableStyle {
            width: 20%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="tableStyle">
                <table >
                  <tbody class="table-light" dir="rtl">
                    <tr>
                    <td>${s.departmentName}</td>
                      <th>القسم</th>
                    </tr>
                    <tr>
                    <td>${s.employeeName}</td>
                      <th>اسم الموظف</th>
                    </tr>
                    <tr>
                      <td>${s.netSalary}</td>
                      <th>الراتب الاساسي</th>
                    </tr>
                    <tr>
                    <td>${s.attendanceDays}</td>
                      <th>عدد ايام الحضور</th>
                    </tr>
                    <tr>                      <td>${s.absenceDays}</td>

                      <th>عدد ايام الغياب</th>
                    </tr>
                    <tr>
                    <td>${s.adds}</td>

                      <th>الاضافي بالساعات</th>
                    </tr>
                    <tr>
                    <td>${s.subs}</td>

                      <th>الخصم بالساعات</th>
                    </tr>
                    <tr>
                    <td>${s.totalAdds}</td>

                      <th>اجمالي الاضافي</th>
                    </tr>
                    <tr>
                    <td>${s.totalSubs}</td>

                      <th>اجمالي الخصم</th>
                    </tr>
                    <tr>
                    <td>${s.actualSalary}</td>

                      <th>صافي المرتب</th>
                    </tr>
                  </tbody>
                </table>
              </div>
        </div>
      </body>
    </html>
      `);
      printWindow.print();
      printWindow.close();
    }
  }
}
