import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe, DecimalPipe } from '@angular/common';
import { AdminEditEmployeeComponent } from './components/admin-edit-employee/admin-edit-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';

import { BooleanDaNePipe } from './pipe/boolean.pipe';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { SearchEmployeesComponent } from './components/search-employees/search-employees.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NewAppointmentComponent } from './components/new-appointment/new-appointment.component';
import { SearchPatientsComponent } from './components/search-patients/search-patients.component';
import { NewPatientComponent } from "./components/new-patient/new-patient.component";import { ScheduledAppointmentsComponent } from './components/scheduled-appointments/scheduled-appointments.component'

import { SpecialistDoctorExaminationComponent } from './components/specialist-doctor-examination/specialist-doctor-examination.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginComponent,
    HomeComponent,
    NewEmployeeComponent,
    SearchEmployeesComponent,
    AdminEditEmployeeComponent,
    PersonalDataComponent,
    ResetPasswordComponent,
    NewAppointmentComponent,
    SearchPatientsComponent,
    NewPatientComponent,
    SpecialistDoctorExaminationComponent,,
    ScheduledAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HotToastModule.forRoot({
      dismissible: true,
      position: 'top-right'
    }),
    FullCalendarModule
  ],
  providers: [
    DecimalPipe,
    DatePipe,
    BooleanDaNePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
