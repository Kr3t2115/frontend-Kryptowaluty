import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/homePage/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LivedataComponent } from './components/dashboard/dashboard/livedata/livedata.component';
import { StartComponent } from './components/dashboard/dashboard/start/start.component';
import { DetailsComponent } from './components/dashboard/dashboard/details/details.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: LivedataComponent },
      { path: 'live', component: LivedataComponent },
      { path: 'start', component: StartComponent },
      { path: 'details/:name', component: DetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
