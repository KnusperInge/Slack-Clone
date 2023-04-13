import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { User } from '../shared/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public EditeMode: boolean = true;
  currentUser?: any;
  birthDate: any;
  constructor(private userS: AuthService) {}

  ngOnInit(): void {
    this.userS.getUser().subscribe((data: any) => {
      this.currentUser = new User(data);
      this.birthDate = new Date(data.birthDate);
    });
  }
  editUser() {
    this.EditeMode = false;
  }

  updateUser() {
    this.EditeMode = true;
    this.currentUser.birthDate = this.birthDate.getTime();
    this.userS
      .updateUser(this.currentUser.id, this.currentUser.toJSON())
      .then(() => {
        console.log('Update successfully');
      });
  }
}
