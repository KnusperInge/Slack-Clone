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

  createMessage() {
    this.channelRef
      .doc('Fsv2RoETod0ycEDaoi82')
      .collection('messages')
      .add({
        creator: 'Martin',
        // creatation: new Date().getTime,
        message: 'hallo ich bins',
        comments: ['Willkommen', 'Hallo'],
      });
  }
}
