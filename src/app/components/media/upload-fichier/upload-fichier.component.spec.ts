import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFichierComponent } from './upload-fichier.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UploadFichierComponent', () => {
  let component: UploadFichierComponent;
  let fixture: ComponentFixture<UploadFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFichierComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
