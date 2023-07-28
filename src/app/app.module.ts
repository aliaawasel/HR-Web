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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FontAwesomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
