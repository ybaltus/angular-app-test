import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadCsvService {
  private lineHeaders = []; //for headings
  private linesRows = []; // for rows
  private static COVID_DATA: string = "https://www.cdc.gov/coronavirus/2019-ncov/map-data-cases.csv"

  constructor(
    private httpClient: HttpClient
  ) { }

  public readCsvFile(file: File){
      let reader: FileReader = new FileReader();
      reader.readAsText(file, 'utf-8');
      reader.onload = (e) => {
        let csv: any = reader.result;

        let allTextLines = [];
        allTextLines = csv.split(/\n/);

        //Table Headers
        let headers = allTextLines[0].split(';');
        headers.forEach((value) => {
          this.lineHeaders.push(value.trim());
        });

        //Delete the header line
        allTextLines.splice(0, 1);

        // Table Rows
       allTextLines.forEach((line) => {
          this.linesRows.push((line.split(';')).map(elem => elem.trim()));
        });
      }

    return [this.lineHeaders, this.linesRows];
  }

  public getInfo(){
    return this.httpClient.get(ReadCsvService.COVID_DATA, {
      responseType: 'text'
    })
  }
}
