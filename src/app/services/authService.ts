import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../shared/user-model';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, map } from 'rxjs';
@Injectable()
export class AuthService {
  userRef: any;
  private CurrentUser: BehaviorSubject<any> = new BehaviorSubject([]);
  private userName: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.userRef = db.collection('Users');
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
      console.log('successfully logged in');
      this.router.navigate(['home']);
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
  updateUser(id: string, user: {}) {
    return this.userRef.doc(id).update(user);
  }

  // Protection Guard
  isAuthenticated() {
    const state = new Subject<boolean>();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        state.next(true);
        this.searchUser(user.uid);
        user.getIdToken().then((idToken) => {
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
  searchUser(uid: string) {
    this.db
      .collection('Users', (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' })
      .subscribe((User: any) => {
        for (const item of User) {
          this.CurrentUser.next(item);
          this.userName.next(item.firstName);
        }
      });
  }

  //return Current user
  getUserName() {
    return this.userName.asObservable();
  }

  getUser() {
    return this.CurrentUser.asObservable();
  }
}
