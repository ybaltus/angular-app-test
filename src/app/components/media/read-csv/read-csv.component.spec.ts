import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCsvComponent } from './read-csv.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ReadCsvComponent', () => {
  let component: ReadCsvComponent;
  let fixture: ComponentFixture<ReadCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCsvComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ReadCsvComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
