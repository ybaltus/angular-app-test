import { Component, OnInit } from '@angular/core';
import {ReadCsvService} from '../../../services/read-csv.service';

@Component({
  selector: 'app-read-csv',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.scss']
})
export class ReadCsvComponent implements OnInit {
  covidData: any[] = [];
  displayedColumns: string[] = [];

  constructor(
    private readCsvService: ReadCsvService
  ) { }

  ngOnInit(): void {
    this.getCovidData();
  }

  getCovidData(){
    this.readCsvService.getInfo().subscribe( data => {
      const list = data.split('\n');

      list.forEach( element => {
        let elements: any[] = element.split(',');
        elements = elements.splice(0, 5);//Jurisdiction, Range, Cases_Reported, Community_Transmission, URL
        elements = elements.map((el) => el.replace(' ', '_'));
        elements = elements.map((el) => el.toLowerCase());

        if(this.displayedColumns.length === 0){
          elements[3] = elements[3].slice(0, -1);
          this.displayedColumns = elements;
        }else{
          this.covidData.push({
            jurisdiction: elements[0],
            range: elements[1],
            cases: elements[2],
            community: elements[3],
            url: elements[4]
          });
        }
      });
    })
  }
}
