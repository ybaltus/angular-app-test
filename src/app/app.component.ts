import { Component, OnInit, OnDestroy } from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {AuthService} from './services/auth.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  secondes: number;
  counterSubscription: Subscription;
  authStatus: boolean;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    const counter = interval(1000);//Observable
    this.authSubscription = this.authService.isAuthObs
      .subscribe(status => {
      this.authStatus = status;
      if(this.authStatus){
        this.counterSubscription = counter.subscribe(
          (value) => {
            this.secondes = value;
          },
          (error => console.log("Mince! Il y a une érreur!: "+error)),
          ()=>{
            console.log("Obesvable coutner complete !");
          }
        )
      }
    })
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
