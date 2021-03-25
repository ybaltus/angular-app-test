import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UploadFileService} from '../../../services/uploadFile.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import {ReadCsvService} from '../../../services/read-csv.service';

@Component({
  selector: 'app-upload-fichier',
  templateUrl: './upload-fichier.component.html',
  styleUrls: ['./upload-fichier.component.scss']
})
export class UploadFichierComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild("fileCsvUpload", {static: false}) fileCsvUpload: ElementRef;
  files: any[] = [];
  filesCsv: any[] = [];

  constructor(
    private uploadService: UploadFileService,
    private readcsvService: ReadCsvService
  ) { }

  ngOnInit(): void {
  }

  uploadFile(file){
    const formData = new FormData();
    formData.append('info', file.info);
    formData.append('data', file.data);
    console.log("formData.get");
    console.log(formData.get('info'));
    console.dir(formData.getAll('data'));

    file.inProgress = true;

    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }

  private uploadFiles(isCsv: boolean = false) {
    this.fileUpload.nativeElement.value = '';
    if(isCsv){
      this.filesCsv.forEach(file => {
        this.uploadFile(file);
      });
    }else{
      this.files.forEach(file => {
        this.uploadFile(file);
      });
    }
  }

  onClickImage() {
    const fileUpload = this.fileUpload.nativeElement;

    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++)
      {
        const file = fileUpload.files[index];
        console.log("Image");
        console.log(file);
        this.files.push({info: file, data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  onClickCsv() {
    const fileCsvUpload = this.fileCsvUpload.nativeElement;

    fileCsvUpload.onchange = () => {
      for (let index = 0; index < fileCsvUpload.files.length; index++)
      {
        const file = fileCsvUpload.files[index];//Filelist object
        console.log("Fichier csv");
        console.log(file);
        const datas = this.readcsvService.readCsvFile(file);
        console.log('datasCsv');
        console.log(datas);
        this.filesCsv.push({ info: file, data: datas, inProgress: false, progress: 0});
      }
      this.uploadFiles(true);
    };
    fileCsvUpload.click();
  }
}
