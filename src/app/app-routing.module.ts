import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { AlreadyLoggedInGuard } from './guard/already-logged-in.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { SearchEmployeesComponent } from './search-employees/search-employees.component';
import { AdminEditEmployeeComponent } from './admin-edit-employee/admin-edit-employee.component';
import { PermissionGuard } from './guard/permission.guard';

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
    data: { permission: 'ROLE_ADMIN' }
  },
  {
    path: 'search-employees',
    component: SearchEmployeesComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'ROLE_ADMIN' }
  },
  {
    path: 'admin-edit-employee/:lbz',
    component: AdminEditEmployeeComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'ROLE_ADMIN' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
