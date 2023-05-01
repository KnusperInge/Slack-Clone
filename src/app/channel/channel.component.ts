import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../services/channelService';
import { AuthService } from '../services/authService';
import { Message } from '../shared/message.model';
import { Thread } from '../shared/thread.model';

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
  activeChannelName;
  currentUser;
  msg: string;
  thread: string;
  arrThread: any = [];
  threadID;
  newMsg;
  newThread;
  activateThread: boolean = false;
  currentThread: any;

  ngOnInit() {
    this.getChannelID();
    this.activeChannel = [];
    this.channel;
    this.UserS.getUserName().subscribe((name) => (this.currentUser = name));
  }

  getChannelID() {
    this.route.params.subscribe((params) => {
      this.channelID = params['id'];
      this.getChannel();
      this.getChannelMeta();
    });
  }

  getChannelMeta() {
    this.channel.searchChannel(this.channelID).subscribe((data) => {
      this.activeChannelName = data.name;
    });
  }
  getChannel() {
    this.channel
      .searchChannelMessages(this.channelID)
      .subscribe((data: any) => {
        data.sort((b, a) =>
          b.createdOn.toString().localeCompare(a.createdOn.toString())
        );
        this.activeChannel = data;
      });
  }
  sendMessage() {
    let date = new Date().getTime();
    this.newMsg = new Message(this.currentUser, date, this.msg);
    this.channel.createMessage(this.channelID, this.newMsg.toJSON());
    this.msg = '';
  }

  // Thread functions
  openThread(threadID) {
    this.threadID = threadID;
    this.activateThread = true;
    this.loadThread();
  }

  closeThread() {
    this.activateThread = !this.activateThread;
  }
  loadThread() {
    console.log('Aktuelle MsgID', this.threadID);
    this.channel
      .getThread(this.channelID, this.threadID)
      .subscribe(async (data) => {
        this.currentThread = await data;
        this.arrThread = data.comments;
        console.log('Arry', this.currentThread.comments);
      });
  }
  sendThread() {
    let date = new Date().getTime();
    let newThread = new Thread(this.currentUser, date, this.thread);
    this.arrThread.push(newThread.toJSON());
    this.thread = '';
    this.channel.addThread(this.channelID, this.threadID, this.arrThread);
  }
}
