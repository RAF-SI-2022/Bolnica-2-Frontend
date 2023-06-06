import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe, DecimalPipe } from '@angular/common';
import { AdminEditEmployeeComponent } from './components/admin/admin-edit-employee/admin-edit-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';

import { BooleanDaNePipe } from './pipe/boolean.pipe';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewEmployeeComponent } from './components/admin/new-employee/new-employee.component';
import { SearchEmployeesComponent } from './components/admin/search-employees/search-employees.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NewAppointmentComponent } from './components/patients/new-appointment/new-appointment.component';
import { SearchPatientsComponent } from './components/patients/search-patients/search-patients.component';
import { NewPatientComponent } from "./components/patients/new-patient/new-patient.component";
import { HealthRecordComponent } from './components/patients/health-records/health-record/health-record.component';
import { BasicHealthRecordComponent } from './components/patients/health-records/basic-health-record/basic-health-record.component';
import { MedicalHistoryRecordComponent } from './components/patients/health-records/medical-history-record/medical-history-record.component';
import { FullMedicalHistoryComponent } from './components/patients/health-records/full-medical-history/full-medical-history.component';
import { IllnessHistoryRecordComponent } from './components/patients/health-records/illness-history-record/illness-history-record.component';
import { ScheduledAppointmentsComponent } from './components/patients/scheduled-appointments/scheduled-appointments.component'
import { ReferralHistoryComponent } from './components/referrals/referral-history/referral-history.component';
import { SpecialistDoctorExaminationComponent } from './components/patients/specialist-doctor-examination/specialist-doctor-examination.component';
import { EditPatientComponent } from './components/patients/edit-patient/edit-patient.component';
import { GenderPipe } from './pipe/gender.pipe';
import { DateOfBirthToAgePipe } from './pipe/date-of-birth-to-age.pipe';
import { ScheduledPatientsComponent } from './components/patients/scheduled-patients/scheduled-patients.component';
import { NewWorkOrderComponent } from './components/laboratory/new-work-order/new-work-order.component';
import { NewLabVisitComponent } from './components/laboratory/lab-visits/new-lab-visit/new-lab-visit.component';
import { LabVisitsComponent } from './components/laboratory/lab-visits/lab-visits.component';
import { NewReferralComponent } from './components/referrals/new-referral/new-referral.component';
import { SearchScheduledLabVisitsComponent } from './components/laboratory/lab-visits/search-scheduled-lab-visits/search-scheduled-lab-visits.component';
import { DocLabWorkOrderHistoryComponent } from './components/laboratory/doc-lab-work-order-history/doc-lab-work-order-history.component';
import { SearchBiochemAccComponent } from './components/laboratory/search-biochem-acc/search-biochem-acc.component';

import { IssuingResultsComponent } from "./components/laboratory/issuing-results/issuing-results.component";
import { FullIssuingResultsComponent } from './components/laboratory/full-issuing-results/full-issuing-results.component';
import { StationaryPatientReceptionComponent } from './components/stationary/nurse/reception-menu/stationary-patient-reception.component';
import { StationaryMenuComponent } from './components/stationary/nurse/menu/stationary-menu.component';
import { PermissionNamesPipePipe } from './pipe/permission-names-pipe.pipe';
import { ViewStationaryPatientReceptionsComponent } from './components/stationary/nurse/view-receptions/view-stationary-patient-receptions.component';
import { NewReceptionComponent } from './components/stationary/new-reception/new-reception.component';
import { AppointmentSchedulingComponent } from './components/stationary/nurse/appointment-scheduling/appointment-scheduling.component';
import { SchedulingComponent } from './components/stationary/nurse/scheduling/scheduling.component';
import { ViewAppointmentsComponent } from './components/stationary/nurse/view-appointments/view-appointments.component';
import { DischargeListComponent } from './components/stationary/doctor/discharge-list/discharge-list.component';
import { HealthReportComponent } from './components/stationary/doctor/health-report/health-report.component';
import { DailyBiochemAccComponent } from './components/laboratory/daily-biochem-acc/daily-biochem-acc.component';
import { CovidComponent } from './components/covid/covid/covid.component';
import { DocPatientConditionHistoryComponent } from './components/stationary/doc-patient-condition-history/doc-patient-condition-history.component';
import { DocStationaryMedicalReportHistoryComponent } from './components/stationary/doc-stationary-medical-report-history/doc-stationary-medical-report-history.component';
import { DocStationaryDischargeHistoryComponent } from './components/stationary/doc-stationary-discharge-history/doc-stationary-discharge-history.component';
import { PatientConditionHistoryComponent } from './components/patients/patient-condition-history/patient-condition-history.component';
import { RegisterPatientConditionComponent } from './components/patients/register-patient-condition/register-patient-condition.component';
import { CovidStatsComponent, NgbdSortableHeader } from './components/covid/covid-stats/covid-stats.component';
import { SearchStationaryPatientsComponent } from './components/search-stationary-patients/search-stationary-patients.component';
import { NurseStationaryMenuComponent } from './components/nurse-stationary-menu/nurse-stationary-menu.component';
import { DoctorStationaryMenuComponent } from './components/doctor-stationary-menu/doctor-stationary-menu.component';
import { DoctorSearchStationaryPatientsComponent } from './components/doctor-search-stationary-patients/doctor-search-stationary-patients.component';
import { CovidSingleCountryComponent } from './components/covid/covid-single-country/covid-single-country.component';
import { RegisterVisitComponent } from './components/stationary/nurse/register-visit/register-visit.component';
import { VisitHistoryComponent } from './components/stationary/nurse/visit-history/visit-history.component';
import { ReceptionVisitsComponent } from './components/reception/visits/reception-visits.component';

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
    SearchScheduledLabVisitsComponent,
    DocLabWorkOrderHistoryComponent,
    SearchBiochemAccComponent,
    IssuingResultsComponent,
    FullIssuingResultsComponent,
    StationaryPatientReceptionComponent,
    StationaryMenuComponent,
    PermissionNamesPipePipe,
    ViewStationaryPatientReceptionsComponent,
    NewReceptionComponent,
    AppointmentSchedulingComponent,
    SchedulingComponent,
    ViewAppointmentsComponent,
    DischargeListComponent,
    HealthReportComponent,
    DailyBiochemAccComponent,
    CovidComponent,
    DocPatientConditionHistoryComponent,
    DocStationaryMedicalReportHistoryComponent,
    DocStationaryDischargeHistoryComponent,
    PatientConditionHistoryComponent,
    RegisterPatientConditionComponent,
    CovidStatsComponent,
    SearchStationaryPatientsComponent,
    NurseStationaryMenuComponent,
    DoctorStationaryMenuComponent,
    DoctorSearchStationaryPatientsComponent,
    CovidSingleCountryComponent,
    RegisterVisitComponent,
    VisitHistoryComponent,
    ReceptionVisitsComponent
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
    FullCalendarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NgbdSortableHeader
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
