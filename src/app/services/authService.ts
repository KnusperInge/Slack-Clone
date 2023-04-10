import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../shared/user-model';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable()
export class AuthService {
  userRef: any;
  CurrentUser: BehaviorSubject<string>;
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.userRef = db.collection('Users');
    this.CurrentUser = new BehaviorSubject('');
  }

  //Sign Up
  async signUp(user: any, password: string) {
    await this.auth
      .createUserWithEmailAndPassword(user.email, password)
      .then((res: any) => {
        user.uid = res.user.uid;
        this.addNewUser(user.toJSON());
      });
  }

  //Sign In
  async signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then((res) => {
      console.log('successfully logged in', res.user.uid);
      // this.searchUser(res);
      // this.router.navigate(['home']);
    });
  }

  //LogOut
  logOut() {
    this.auth.signOut();
    this.router.navigate(['']);
    console.log('Ausgelogt');
  }

  //new User
  addNewUser(user: User) {
    this.userRef.add(user).then(() => {
      console.log('successfully saved');
      this.router.navigate(['home']);
    });
  }
  //update User dates

  // Protection Guard
  isAuthenticated() {
    const state = new Subject<boolean>();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        state.next(true);
        this.searchUser(user.uid);
        user.getIdToken().then((idToken) => {
          //  this.CurrentUser = new BehaviorSubject<string>(idToken);  gibt den kompletten anmelde Token zurück
          this.router.navigate(['home']);
        });
      } else {
        state.next(false);
        // this.router.navigate(['/home']);
      }
    });
    return state.asObservable();
  }

  //search user with uid
  searchUser(uid) {
    this.db
      .collection('Users', (ref) => ref.where('uid', '==', uid))
      .valueChanges()
      .subscribe((User: any) => {
        this.CurrentUser.next(User[0].firstName);
      });
  }

  //return Current user
  getUser() {
    return this.CurrentUser.asObservable();
  }
}
