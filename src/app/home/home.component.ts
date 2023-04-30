import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewChannelComponent } from '../create-new-channel/create-new-channel.component';
import { ChannelService } from '../services/channelService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  panelOpenState = true;
  userName: string;
  channels;
  constructor(
    private userS: AuthService,
    public dialog: MatDialog,
    private ChannelS: ChannelService
  ) {}

  ngOnInit(): void {
    this.userS.getUserName().subscribe((u) => (this.userName = u));
    this.ChannelS.getAllChannels().subscribe((data) => {
      this.channels = data;
      console.log(this.channels);
    });
  }
  logOut() {
    this.userS.logOut();
  }
  openDialog() {
    this.dialog.open(CreateNewChannelComponent);
  }
}
