import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppareilModel} from '../models/Appareil.model';

@Injectable()
export class AppareilService{
  appareilSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Frigo',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  constructor(private httpClient: HttpClient) {
  }

  saveAppareilsToServer(){
    this.httpClient
      .put('https://tutoangularoc-cdc8a-default-rtdb.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getApapreilsFromServer(){
    this.httpClient
      .get<any[]>('https://tutoangularoc-cdc8a-default-rtdb.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }

  switchOnAll(){
    for(let appareil of this.appareils){
      appareil.status = 'allumé';
    }
  }

  switchOffAll(){
    for(let appareil of this.appareils){
      appareil.status = 'éteint';
    }
  }
  switchOnOne(i:number){
    this.appareils[i].status = 'allumé';
  }

  switchOffOne(i: number){
    this.appareils[i].status = 'éteint';
  }

  getByAppareilId(id: number){
    return this.appareils.find((a) => {
      return a.id === id;
    });
  }

  addAppareil(name: string, status: string){
    const newAppareil = {
      id: this.appareils.length > 0 ? this.appareils.length +1 : 1,
      name: name !== null ? name : '',
      status: status !== null ? status : ''
    };
    this.appareils.push(newAppareil);
    this.emitAppareilSubject();
  }

  editAppareil(name: string, status: string, appareil: AppareilModel){
    appareil.name= name;
    appareil.status = status;
    const index = this.appareils.findIndex((element) => element.id == appareil.id);
    this.appareils.splice(index, 1, appareil);
    this.emitAppareilSubject();
  }
}
