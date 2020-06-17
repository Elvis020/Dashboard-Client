import { DatahttpComponent } from './components/datahttp/datahttp.component';
import { AuthGuardService } from './auth-guard.service';
import { DashyComponent } from './components/dashboard/dashy.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';





const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashyComponent, canActivate: [AuthGuardService] },
  { path: 'datahttp', component: DatahttpComponent},
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
