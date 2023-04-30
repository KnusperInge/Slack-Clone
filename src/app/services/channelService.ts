import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channelmodel } from '../shared/channel.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ChannelService {
  channelRef: any;
  channelID: string;
  constructor(private db: AngularFirestore) {
    this.channelRef = db.collection('Channels');
  }

  createChannel(channel: Channelmodel) {
    this.channelRef.add(channel).then((docRef) => {
      this.channelID = docRef.id;
      this.addID();
    });
  }

  addID() {
    this.channelRef.doc(this.channelID).update({ id: this.channelID });
  }

  getAllChannels() {
    return this.channelRef.snapshotChanges().pipe(
      map((res: any) => {
        const channels = [];
        res.map((changes) => {
          channels.push({
            ...changes.payload.doc.data(),
          });
        });
        return channels;
      })
    );
  }

  searchChannel(id: string) {
    const docRef = this.db
      .collection('Channels')
      .doc(id)
      .collection('messages');
    return docRef.valueChanges();
  }

  createMessage(id: string, UserName: string, msg: string, date: number) {
    this.channelRef.doc(id).collection('messages').add({
      creator: UserName,
      creatation: date,
      message: msg,
      comments: [],
    });
  }
}
