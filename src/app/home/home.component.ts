import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  panelOpenState = true;
  userName: string;
  constructor(private userS: AuthService) {}

  ngOnInit(): void {
    this.userS.getUserName().subscribe((u) => (this.userName = u));
  }
  logOut() {
    this.userS.logOut();
  }
}
