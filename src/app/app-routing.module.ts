import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { Protection } from './shared/protectionGuard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [Protection],
    children: [
      { path: 'user', component: PlaceholderComponent },
      { path: '', component: UserComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
