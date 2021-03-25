import { Component, OnInit, OnDestroy } from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  secondes: number;
  counterSubscription: Subscription

  constructor() {

  }

  ngOnInit() {
    const counter = interval(1000);//Observable

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

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }
}
