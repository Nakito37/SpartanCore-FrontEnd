import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: MainComponent },
  //{ path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  //{ path: 'publications', component: PublicationsComponent, canActivate: [authGuard]},
  { path: 'profile', component: ProfileComponent},
  { path: 'publications', component: PublicationsComponent},


  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
