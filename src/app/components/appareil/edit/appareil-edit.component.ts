import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppareilService} from '../../../services/appareil.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppareilModel} from '../../../models/Appareil.model';

@Component({
  selector: 'app-appareil-edit',
  templateUrl: './appareil-edit.component.html',
  styleUrls: ['./appareil-edit.component.scss']
})
export class AppareilEditComponent implements OnInit {
  defaultOnOff = 'éteint';
  titleEdit: String = "Ajouter un appareil";
  idAppareil: number;
  appareil: AppareilModel;
  @ViewChild('h1Appareil', {static: true}) h1Appareil: ElementRef;

  constructor(
    private appareilService: AppareilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idAppareil = parseInt(params['id']);
    })

    if(this.idAppareil){
      const appareil = this.appareilService.getByAppareilId(this.idAppareil);
      this.titleEdit = "Éditer l'appareil " + this.idAppareil;
      if(appareil){
        this.appareil = {
          id: appareil.id,
          name: appareil.name,
          status: appareil.status
        };
        this.defaultOnOff = appareil.status;
      }
    }else{
      this.titleEdit = "Ajouter un appareil";
    }
    this.h1Appareil.nativeElement.innerHTML = this.titleEdit;

  }

  onSubmit(form: NgForm){
    //Méthode template
    const name = form.value['name'];
    const status = form.value['status'];

    if(this.idAppareil){
      this.appareilService.editAppareil(name, status, this.appareil);
    }else{
      this.appareilService.addAppareil(name, status);
    }
    this.router.navigate(['/appareils']);
  }

}
