import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/authService';
import { MatDialogRef } from '@angular/material/dialog';
import { ChannelService } from '../services/channelService';

@Component({
  selector: 'app-create-new-channel',
  templateUrl: './create-new-channel.component.html',
  styleUrls: ['./create-new-channel.component.scss'],
})
export class CreateNewChannelComponent implements OnInit {
  constructor(
    private fB: FormBuilder,
    private UserS: AuthService,
    private ChannelS: ChannelService,
    private dialogRef: MatDialogRef<CreateNewChannelComponent>
  ) {}
  addNewChannel: FormGroup;
  toppings = new FormControl('');
  message = false;
  currentUserID: string;
  toppingList: string[] = ['All Users', 'User 1', 'User 2', 'User 3'];

  ngOnInit(): void {
    this.UserS.getUser().subscribe((id) => (this.currentUserID = id.id));
    this.addNewChannel = this.fB.group({
      name: ['', Validators.required],
      user: this.toppings,
      creationDate: new Date().getTime(),
      creator: this.currentUserID,
    });
  }

  onSubmit() {
    // console.log(this.addNewChannel.value);
    this.ChannelS.createChannel(this.addNewChannel.value);
    this.message = true;
    setTimeout(() => {
      this.message = false;
      this.dialogRef.close();
    }, 400);
  }

  resetForm() {
    this.addNewChannel.reset();
    this.dialogRef.close();
  }
}
