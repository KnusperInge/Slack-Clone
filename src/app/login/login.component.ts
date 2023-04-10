import { Component } from '@angular/core';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string;
  password: string;
  constructor(private userS: AuthService) {}

  logIn() {
    this.userS.signIn(this.email, this.password);
  }
}
