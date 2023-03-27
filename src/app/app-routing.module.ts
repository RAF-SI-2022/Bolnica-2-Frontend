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
    data: {permissions: ['ROLE_ADMIN']}
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
