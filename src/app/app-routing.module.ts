import { SalaryReportComponent } from './Components/salary-report/salary-report.component';
import { OfficialVactionsComponent } from './Components/official-vactions/official-vactions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './Components/employees/employees.component';
import { UsersComponent } from './Components/users/users.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { GeneralSettingsComponent } from './Components/general-settings/general-settings.component';
import { DepartmentComponent } from './Components/department/department.component';
import { NewEmployeeComponent } from './Components/new-employee/new-employee.component';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { AttendanceReportComponent } from './Components/attendance-report/attendance-report.component';


const routes: Routes = [
  {path:'employees',component:EmployeesComponent},
  {path:'users',component:UsersComponent},
  {path:'groups',component:GroupsComponent},
  {path:'generalsettings',component:GeneralSettingsComponent},
  {path:'officialVactons',component:OfficialVactionsComponent},
  {path:'salaryreport',component:SalaryReportComponent},
  {path:'departments',component:DepartmentComponent},
  {path:'newEmployee',component:NewEmployeeComponent},
  {path:'newUser',component:NewUserComponent},
  {path:"Attendacse",component:AttendanceReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
