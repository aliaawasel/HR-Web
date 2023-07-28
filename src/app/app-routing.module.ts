import { SalaryReportComponent } from './Components/salary-report/salary-report.component';
import { OfficialVactionsComponent } from './Components/official-vactions/official-vactions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './Components/employees/employees.component';
import { UsersComponent } from './Components/users/users.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { GeneralSettingsComponent } from './Components/general-settings/general-settings.component';

const routes: Routes = [
  {path:'employees',component:EmployeesComponent},
  {path:'users',component:UsersComponent},
  {path:'groups',component:GroupsComponent},
  {path:'generalsettings',component:GeneralSettingsComponent},
  {path:'officialVactons',component:OfficialVactionsComponent},
  {path:'salaryreport',component:SalaryReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
