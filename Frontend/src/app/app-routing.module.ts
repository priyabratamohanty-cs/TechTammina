import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuardGuard } from './services/guard.guard';
import { RegistartionComponent } from './components/registartion/registartion.component';
import { UsersComponent } from './components/users/users.component';
import { AddBatchComponent } from './components/add-batch/add-batch.component';
import { ViewBatchComponent } from './components/view-batch/view-batch.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistartionComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'add/batch',
    component: AddBatchComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'view/batch',
    component: ViewBatchComponent,
    canActivate: [GuardGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
