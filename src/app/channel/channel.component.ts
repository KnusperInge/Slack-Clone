import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../services/channelService';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private channel: ChannelService,
    private UserS: AuthService
  ) {}

  channelID;
  activeChannel;
  currentUser;
  msg: string;
  ngOnInit() {
    this.getChannelID();
    this.activeChannel = [];

    this.UserS.getUserName().subscribe((name) => (this.currentUser = name));
  }

  getChannelID() {
    this.route.params.subscribe((params) => {
      this.channelID = params['id'];
      this.getChannel();
    });
  }
  getChannel() {
    this.channel.searchChannel(this.channelID).subscribe((test) => {
      this.activeChannel = test;
    });
  }
  sendMessage() {
    let date = new Date().getTime();

    this.channel.createMessage(
      this.channelID,
      this.currentUser,
      this.msg,
      date
    );
  }
}
