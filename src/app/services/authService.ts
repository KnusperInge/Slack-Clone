import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../shared/user-model';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable()
export class AuthService {
  userRef: any;
  CurrentUser: any;
  constructor(
    private auth: AngularFireAuth,
    db: AngularFirestore,
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
      console.log('successfully logged in', res.user.uid);
      this.router.navigate(['home']);
    });
  }

  //LogOut
  logOut() {
    this.auth.signOut();
    this.router.navigate(['/']);
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
        user.getIdToken().then((idToken) => {
          this.CurrentUser = new BehaviorSubject<string>(idToken);

          this.router.navigate(['home']);
        });
      } else {
        state.next(false);
        // this.router.navigate(['/home']);
      }
    });
    return state.asObservable();
  }
}
