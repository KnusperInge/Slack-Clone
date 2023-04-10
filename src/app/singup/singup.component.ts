import { Component } from '@angular/core';
import { AuthService } from '../services/authService';
import { User } from '../shared/user-model';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent {
  user = new User();
  password: string;
  constructor(private userS: AuthService) {}

  createAcc() {
    console.log(this.user, this.password);
    this.userS.signUp(this.user, this.password);
  }
}
