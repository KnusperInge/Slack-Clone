import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channelmodel } from '../shared/channel.model';
import { map } from 'rxjs/operators';
import { Message } from '../shared/message.model';

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

  searchChannel(id) {
    const docRef = this.channelRef.doc(id);
    return docRef.valueChanges();
  }

  searchChannelMessages(id: string) {
    const docRef = this.db
      .collection('Channels')
      .doc(id)
      .collection('messages');
    return docRef.valueChanges();
  }

  createMessage(id: string, msg: any) {
    this.channelRef
      .doc(id)
      .collection('messages')
      .add(msg)
      .then((docRef) => {
        this.channelRef
          .doc(id)
          .collection('messages')
          .doc(docRef.id)
          .update({ msgID: docRef.id });
      });
  }

  //Thread functions

  getThread(channelID, msgID) {
    return this.channelRef
      .doc(channelID)
      .collection('messages')
      .doc(msgID)
      .valueChanges();
  }

  addThread(channelID, msgID, thread: any) {
    this.channelRef
      .doc(channelID)
      .collection('messages')
      .doc(msgID)
      .update({ comments: thread });
  }
}
