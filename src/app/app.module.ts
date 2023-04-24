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
import { NewPatientComponent } from "./components/new-patient/new-patient.component";
import { HealthRecordComponent } from './components/health-records/health-record/health-record.component';
import { BasicHealthRecordComponent } from './components/health-records/basic-health-record/basic-health-record.component';
import { MedicalHistoryRecordComponent } from './components/health-records/medical-history-record/medical-history-record.component';
import { FullMedicalHistoryComponent } from './components/health-records/full-medical-history/full-medical-history.component';
import { IllnessHistoryRecordComponent } from './components/health-records/illness-history-record/illness-history-record.component';
import { ScheduledAppointmentsComponent } from './components/scheduled-appointments/scheduled-appointments.component'
import { ReferralHistoryComponent } from './components/referral-history/referral-history.component';
import { SpecialistDoctorExaminationComponent } from './components/specialist-doctor-examination/specialist-doctor-examination.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { GenderPipe } from './pipe/gender.pipe';
import { DateOfBirthToAgePipe } from './pipe/date-of-birth-to-age.pipe';
import { ScheduledPatientsComponent } from './components/scheduled-patients/scheduled-patients.component';
import { NewWorkOrderComponent } from './components/new-work-order/new-work-order.component';
import { NewLabVisitComponent } from './components/lab-visits/new-lab-visit/new-lab-visit.component';
import { LabVisitsComponent } from './components/lab-visits/lab-visits.component';
import { NewReferralComponent } from './components/new-referral/new-referral.component';
import { SearchBiochemAccComponent } from './components/search-biochem-acc/search-biochem-acc.component';

import { IssuingResultsComponent } from "./components/issuing-results/issuing-results.component";
import { FullIssuingResultsComponent } from './components/full-issuing-results/full-issuing-results.component';

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
    ReferralHistoryComponent,
    SpecialistDoctorExaminationComponent,
    NewPatientComponent,
    HealthRecordComponent,
    BasicHealthRecordComponent,
    MedicalHistoryRecordComponent,
    FullMedicalHistoryComponent,
    IllnessHistoryRecordComponent,
    ScheduledAppointmentsComponent,
    EditPatientComponent,
    GenderPipe,
    ScheduledPatientsComponent,
    NewWorkOrderComponent,
    NewReferralComponent,
    DateOfBirthToAgePipe,
    NewLabVisitComponent,
    LabVisitsComponent,
    SearchBiochemAccComponent,
    IssuingResultsComponent,
    FullIssuingResultsComponent
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
    GenderPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
