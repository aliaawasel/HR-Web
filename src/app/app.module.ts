import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { UsersComponent } from './Components/users/users.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { GeneralSettingsComponent } from './Components/general-settings/general-settings.component';
import { OfficialVactionsComponent } from './Components/official-vactions/official-vactions.component';
import { SalaryReportComponent } from './Components/salary-report/salary-report.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DepartmentComponent } from './Components/department/department.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewEmployeeComponent } from './Components/new-employee/new-employee.component';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { AttendanceReportComponent } from './Components/attendance-report/attendance-report.component';
import { CustomFilterPipePipe } from './custom-filter-pipe.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './Components/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    UsersComponent,
    EmployeesComponent,
    GeneralSettingsComponent,
    OfficialVactionsComponent,
    SalaryReportComponent,
    SidebarComponent,
    DepartmentComponent,
    NewEmployeeComponent,
    NewUserComponent,
    AttendanceReportComponent,
    CustomFilterPipePipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FontAwesomeModule,RouterModule,HttpClientModule,ReactiveFormsModule,FormsModule,NgxPaginationModule,    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
