import {BehaviorSubject, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  isAuth = false;
  isAuthBehaviorSubject = new BehaviorSubject(false);
  isAuthObs = this.isAuthBehaviorSubject.asObservable();

  signIn() {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        this.isAuth = true;
        this.isAuthBehaviorSubject.next(this.isAuth);
        resolve(true);
      }, 2000)
    })
  }

  signOut(){
    this.isAuth = false;
    this.isAuthBehaviorSubject.next(this.isAuth);
  }
}
