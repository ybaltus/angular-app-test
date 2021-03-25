import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {AppareilService} from '../../../services/appareil.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {
  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() index: number;

  appareils: any[];
  appareilSubscription: Subscription

  lastDate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(() => {
      resolve(date);
    }, 2000);
  });

  constructor(private appareilService: AppareilService) {
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[])=>{
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  onSave(){
    this.appareilService.saveAppareilsToServer();
  }
  onFetch(){
    this.appareilService.getApapreilsFromServer();
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }
}
