import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { AlreadyLoggedInGuard } from './guard/already-logged-in.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NewEmployeeComponent } from './components/admin/new-employee/new-employee.component';
import { NewPatientComponent } from "./components/patients/new-patient/new-patient.component";
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { SearchEmployeesComponent } from './components/admin/search-employees/search-employees.component';
import { AdminEditEmployeeComponent } from './components/admin/admin-edit-employee/admin-edit-employee.component';
import { PermissionGuard } from './guard/permission.guard';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { NewAppointmentComponent } from './components/patients/new-appointment/new-appointment.component';
import { SearchPatientsComponent } from './components/patients/search-patients/search-patients.component';
import { HealthRecordComponent } from "./components/patients/health-records/health-record/health-record.component";
import { BasicHealthRecordComponent } from "./components/patients/health-records/basic-health-record/basic-health-record.component";
import { MedicalHistoryRecordComponent } from "./components/patients/health-records/medical-history-record/medical-history-record.component";
import { FullMedicalHistoryComponent } from "./components/patients/health-records/full-medical-history/full-medical-history.component";
import { IllnessHistoryRecordComponent } from "./components/patients/health-records/illness-history-record/illness-history-record.component";
import { ReferralHistoryComponent } from './components/referrals/referral-history/referral-history.component';

import { SpecialistDoctorExaminationComponent } from './components/patients/specialist-doctor-examination/specialist-doctor-examination.component';
import { ScheduledAppointmentsComponent } from './components/patients/scheduled-appointments/scheduled-appointments.component';
import { EditPatientComponent } from './components/patients/edit-patient/edit-patient.component';
import { ScheduledPatientsComponent } from './components/patients/scheduled-patients/scheduled-patients.component';
import { NewWorkOrderComponent } from './components/laboratory/new-work-order/new-work-order.component';
import { NewLabVisitComponent } from './components/laboratory/lab-visits/new-lab-visit/new-lab-visit.component';
import { LabVisitsComponent } from './components/laboratory/lab-visits/lab-visits.component';
import { NewReferralComponent } from './components/referrals/new-referral/new-referral.component';
import { SearchScheduledLabVisitsComponent } from './components/laboratory/lab-visits/search-scheduled-lab-visits/search-scheduled-lab-visits.component';
import { DocLabWorkOrderHistoryComponent } from './components/laboratory/doc-lab-work-order-history/doc-lab-work-order-history.component';
import { IssuingResultsComponent } from "./components/laboratory/issuing-results/issuing-results.component";
import { FullIssuingResultsComponent } from "./components/laboratory/full-issuing-results/full-issuing-results.component";
import { SearchBiochemAccComponent } from './components/laboratory/search-biochem-acc/search-biochem-acc.component';
import { StationaryPatientReceptionComponent } from './components/stationary/nurse/reception-menu/stationary-patient-reception.component';
import { StationaryMenuComponent } from './components/stationary/nurse/menu/stationary-menu.component';
import { ViewStationaryPatientReceptionsComponent } from './components/stationary/nurse/view-receptions/view-stationary-patient-receptions.component';
import { NewReceptionComponent } from './components/stationary/new-reception/new-reception.component';
import { AppointmentSchedulingComponent } from "./components/stationary/nurse/appointment-scheduling/appointment-scheduling.component";
import { SchedulingComponent } from "./components/stationary/nurse/scheduling/scheduling.component";
import { ViewAppointmentsComponent } from "./components/stationary/nurse/view-appointments/view-appointments.component";
import { DischargeListComponent } from './components/stationary/doctor/discharge-list/discharge-list.component';
import { HealthReportComponent } from './components/stationary/doctor/health-report/health-report.component';
import { DailyBiochemAccComponent } from './components/laboratory/daily-biochem-acc/daily-biochem-acc.component';
import { CovidComponent } from './components/covid/covid/covid.component';
import { DocPatientConditionHistoryComponent } from './components/stationary/doc-patient-condition-history/doc-patient-condition-history.component';
import { DocStationaryMedicalReportHistoryComponent } from './components/stationary/doc-stationary-medical-report-history/doc-stationary-medical-report-history.component';
import { DocStationaryDischargeHistoryComponent } from './components/stationary/doc-stationary-discharge-history/doc-stationary-discharge-history.component';
import { PatientConditionHistoryComponent } from './components/patients/patient-condition-history/patient-condition-history.component';
import { RegisterPatientConditionComponent } from './components/patients/register-patient-condition/register-patient-condition.component';
import { CovidStatsComponent } from './components/covid/covid-stats/covid-stats.component';
import { SearchStationaryPatientsComponent } from './components/search-stationary-patients/search-stationary-patients.component';
import { NurseStationaryMenuComponent } from './components/nurse-stationary-menu/nurse-stationary-menu.component';
import { DoctorSearchStationaryPatientsComponent } from './components/doctor-search-stationary-patients/doctor-search-stationary-patients.component';
import { DoctorStationaryMenuComponent } from './components/doctor-stationary-menu/doctor-stationary-menu.component';
import { CovidSingleCountryComponent } from './components/covid/covid-single-country/covid-single-country.component';
import { RegisterVisitComponent } from './components/stationary/nurse/register-visit/register-visit.component';
import { VisitHistoryComponent } from './components/stationary/nurse/visit-history/visit-history.component';
import { ReceptionVisitsComponent } from './components/reception/visits/reception-visits.component';
import { PatientsForCovidExamListComponent } from './covid/patients-for-covid-exam-list/patients-for-covid-exam-list.component';
import { ScheduleCovidTestingComponent } from './components/covid/testing/schedule-covid-testing/schedule-covid-testing.component';
import { CovidTestingMenuComponent } from './components/covid/testing/covid-testing-menu/covid-testing-menu.component';
import { ScheduledCovidTestsComponent } from './components/covid/testing/scheduled-covid-tests/scheduled-covid-tests.component';
import { NewCovidTestComponent } from './components/covid/testing/new-covid-test/new-covid-test.component';
import { CovidVaccinationsMenuComponent } from './components/covid/vaccinations/covid-vaccinations-menu/covid-vaccinations-menu.component';
import { ScheduleCovidVaccinationComponent } from './components/covid/vaccinations/schedule-covid-vaccination/schedule-covid-vaccination.component';
import { ScheduledCovidVaccinationsComponent } from './components/covid/vaccinations/scheduled-covid-vaccinations/scheduled-covid-vaccinations.component';
import { NewCovidVaccinationComponent } from './components/covid/vaccinations/new-covid-vaccination/new-covid-vaccination.component';
import { CovidHospitalMenuComponent } from './components/covid/hospital/covid-hospital-menu/covid-hospital-menu.component';
import { SearchCovidHospitalizedComponent } from './components/covid/hospital/search-covid-hospitalized/search-covid-hospitalized.component';
import { RegisterCovidHealthStateComponent } from './components/covid/hospital/register-covid-health-state/register-covid-health-state.component';
import { CovidHistoryComponent } from './components/covid/covid-history/covid-history.component';
import { ProcessCovidTestsComponent } from './components/covid/testing/process-covid-tests/process-covid-tests.component';
import { EmployeeShiftsComponent } from './components/employee-shifts/employee-shifts.component';
import { EditEmployeeShiftsComponent } from './components/edit-employee-shifts/edit-employee-shifts.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AlreadyLoggedInGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AlreadyLoggedInGuard]
  },
  {
    path: 'personal-data',
    component: PersonalDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-employee',
    component: NewEmployeeComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_ADMIN'] }
  },
  {
    path: 'new-patient',
    component: NewPatientComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER'] }
  },
  {
    path: 'search-employees',
    component: SearchEmployeesComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_ADMIN'] }
  },
  {
    path: 'admin-edit-employee/:lbz',
    component: AdminEditEmployeeComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_ADMIN'] }
  },
  {
    path: 'forgot-password/:reset-token',
    component: ResetPasswordComponent,
    canActivate: [AlreadyLoggedInGuard]
  },
  {
    path: 'new-appointment',
    component: NewAppointmentComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER'] }
  },
  {
    path: 'search-patients',
    component: SearchPatientsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV', 'ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER'] }
  },
  {
    path: 'health-record/:lbp',
    component: HealthRecordComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'basic-health-record',
    component: BasicHealthRecordComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'medical-history-record',
    component: MedicalHistoryRecordComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'full-medical-history',
    component: FullMedicalHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'illness-history',
    component: IllnessHistoryRecordComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'specialist-doctor-examination',
    component: SpecialistDoctorExaminationComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'covid/specialist-doctor-examination',
    component: SpecialistDoctorExaminationComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'scheduled-appointments',
    component: ScheduledAppointmentsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV', 'ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'edit-patient/:lbp',
    component: EditPatientComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'new-referral/:lbp',
    component: NewReferralComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'scheduled-patients',
    component: ScheduledPatientsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_LAB_TEHNICAR', 'ROLE_VISI_LAB_TEHNICAR'] }
  },
  {
    path: 'new-work-order/:lbp',
    component: NewWorkOrderComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_LAB_TEHNICAR', 'ROLE_VISI_LAB_TEHNICAR'] }
  },
  {
    path: 'new-work-order',
    component: NewWorkOrderComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_LAB_TEHNICAR', 'ROLE_VISI_LAB_TEHNICAR'] }
  },
  {
    path: 'lab-visits',
    component: LabVisitsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_VISI_LAB_TEHNICAR', 'ROLE_LAB_TEHNICAR'] }
  },
  {
    path: 'new-lab-visit',
    component: NewLabVisitComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_VISI_LAB_TEHNICAR', 'ROLE_LAB_TEHNICAR'] }
  },
  {
    path: 'referral-history/:lbp',
    component: ReferralHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'search-scheduled-lab-visits',
    component: SearchScheduledLabVisitsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_VISI_LAB_TEHNICAR', 'ROLE_LAB_TEHNICAR'] }
  },
  {
    path: 'doc-lab-work-order-history/:lbp',
    component: DocLabWorkOrderHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'search-biochem-acc',
    component: SearchBiochemAccComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_BIOHEMICAR', 'ROLE_SPEC_MED_BIOHEMIJE'] }
  },
  {
    path: 'issuing-results',
    component: IssuingResultsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_VISI_LAB_TEHNICAR', 'ROLE_LAB_TEHNICAR'] }
  },
  {
    path: 'full-issuing-results/:orderId',
    component: FullIssuingResultsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_VISI_LAB_TEHNICAR', 'ROLE_LAB_TEHNICAR'] }
  },
  {
    path: 'stationary-menu',
    component: StationaryMenuComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'stationary-patient-reception',
    component: StationaryPatientReceptionComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'view-stationary-patient-receptions',
    component: ViewStationaryPatientReceptionsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'new-reception/:lbp',
    component: NewReceptionComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'new-reception',
    component: NewReceptionComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'appointment-scheduling',
    component: AppointmentSchedulingComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'scheduling',
    component: SchedulingComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'view-appointments',
    component: ViewAppointmentsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'discharge-list/:lbp',
    component: DischargeListComponent,
    canActivate: [AuthGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA','ROLE_DR_SPEC','ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'covid/discharge-list/:lbp',
    component: DischargeListComponent,
    canActivate: [AuthGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA','ROLE_DR_SPEC','ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'health-report/:lbp',
    component: HealthReportComponent,
    canActivate: [AuthGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA','ROLE_DR_SPEC','ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'covid/health-report/:lbp',
    component: HealthReportComponent,
    canActivate: [AuthGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA','ROLE_DR_SPEC','ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'daily-biochem-acc',
    component: DailyBiochemAccComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_BIOHEMICAR', 'ROLE_SPEC_MED_BIOHEMIJE'] }
  },
  {
    path: 'covid',
    component: CovidComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_DR_SPEC_ODELJENJA','ROLE_DR_SPEC','ROLE_DR_SPEC_POV', 'ROLE_RECEPCIONER', 'ROLE_VISI_LAB_TEHNICAR', 'ROLE_LAB_TEHNICAR', 'ROLE_MED_BIOHEMICAR', 'ROLE_SPEC_MED_BIOHEMIJE'] }
  },
  {
    path: 'covid/new-appointment',
    component: NewAppointmentComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER'] }
  },
  {
    path: 'doc-patient-condition-history/:lbp',
    component: DocPatientConditionHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'doc-stationary-medical-report-history/:lbp',
    component: DocStationaryMedicalReportHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'doc-stationary-discharge-history/:lbp',
    component: DocStationaryDischargeHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'patient-condition-history/:lbp',
    component: PatientConditionHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'register-patient-condition/:lbp',
    component: RegisterPatientConditionComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'covid/covid-stats',
    component: CovidStatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search-stationary-patients',
    component: SearchStationaryPatientsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'nurse-stationary-menu/:lbp',
    component: NurseStationaryMenuComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'doctor-search-stationary-patients',
    component: DoctorSearchStationaryPatientsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'doctor-stationary-menu/:lbp',
    component: DoctorStationaryMenuComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'covid/covid-single-country/:iso',
    component: CovidSingleCountryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nurse-stationary-menu/register-visit/:lbp',
    component: RegisterVisitComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER'] }
  },
  {
    path: 'nurse-stationary-menu/visit-history/:lbp',
    component: VisitHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'visits',
    component: ReceptionVisitsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_RECEPCIONER'] }
  },
  {
    path: 'covid/patients-covid-exam-list',
    component: PatientsForCovidExamListComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'covid/testing',
    component: CovidTestingMenuComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER', 'ROLE_VISI_LAB_TEHNICAR', 'ROLE_LAB_TEHNICAR', 'ROLE_MED_BIOHEMICAR', 'ROLE_SPEC_MED_BIOHEMIJE'] }
  },
  {
    path: 'covid/testing/schedule-covid-testing',
    component: ScheduleCovidTestingComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER'] }
  },
  {
    path: 'covid/testing/scheduled-covid-tests',
    component: ScheduledCovidTestsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'covid/testing/new-covid-test/:lbp/:id',
    component: NewCovidTestComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'covid/vaccinations',
    component: CovidVaccinationsMenuComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER'] }
  },
  {
    path: 'covid/vaccinations/schedule-covid-vaccination',
    component: ScheduleCovidVaccinationComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_RECEPCIONER'] }
  },
  {
    path: 'covid/vaccinations/scheduled-covid-vaccinations',
    component: ScheduledCovidVaccinationsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'covid/vaccinations/new-covid-vaccination/:lbp/:id',
    component: NewCovidVaccinationComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'covid/hospital',
    component: CovidHospitalMenuComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'covid/new-reception',
    component: NewReceptionComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'covid/hospital/search-hospitalized-patients',
    component: SearchCovidHospitalizedComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV'] }
  },
  {
    path: 'covid/hospital/register-covid-health-state/:lbp',
    component: RegisterCovidHealthStateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'health-record/covid/:lbp',
    component: CovidHistoryComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV', 'ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'covid/testing/process-covid-tests',
    component: ProcessCovidTestsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_VISI_LAB_TEHNICAR', 'ROLE_LAB_TEHNICAR', 'ROLE_MED_BIOHEMICAR', 'ROLE_SPEC_MED_BIOHEMIJE'] }
  },
  {
    path: 'employee-shifts',
    component: EmployeeShiftsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_ADMIN', 'ROLE_DR_SPEC_POV', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'employee-shifts/:lbz',
    component: EditEmployeeShiftsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_ADMIN', 'ROLE_DR_SPEC_POV', 'ROLE_VISA_MED_SESTRA'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
