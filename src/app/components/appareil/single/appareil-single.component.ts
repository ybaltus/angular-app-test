import { Component, OnInit } from '@angular/core';
import {AppareilService} from '../../../services/appareil.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-appareil-single',
  templateUrl: './appareil-single.component.html',
  styleUrls: ['./appareil-single.component.scss']
})
export class AppareilSingleComponent implements OnInit {
  name: string;
  status: string;

  constructor(private appareilService: AppareilService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    const appareilTarget = this.appareilService.getByAppareilId(+id);
    if(appareilTarget){
      this.name = appareilTarget.name;
      this.status = appareilTarget.status;
    }else{
      alert("L'appareil n'existe pas");
    }
  }
}
