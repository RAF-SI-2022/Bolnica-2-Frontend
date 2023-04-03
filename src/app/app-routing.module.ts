import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { AlreadyLoggedInGuard } from './guard/already-logged-in.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewPatientComponent } from "./components/new-patient/new-patient.component";
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { SearchEmployeesComponent } from './components/search-employees/search-employees.component';
import { AdminEditEmployeeComponent } from './components/admin-edit-employee/admin-edit-employee.component';
import { PermissionGuard } from './guard/permission.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NewAppointmentComponent } from './components/new-appointment/new-appointment.component';
import { SearchPatientsComponent } from './components/search-patients/search-patients.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';

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
  }
  ,
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
    data: {permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA']}
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
    data: { permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'search-patients',
    component: SearchPatientsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permissions: ['ROLE_DR_SPEC_ODELJENJA','ROLE_DR_SPEC','ROLE_DR_SPEC_POV','ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA'] }
  },
  {
    path: 'edit-patient/:lbp',
    component: EditPatientComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {permissions: ['ROLE_MED_SESTRA', 'ROLE_VISA_MED_SESTRA']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
