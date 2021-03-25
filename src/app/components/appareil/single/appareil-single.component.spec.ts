import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppareilSingleComponent } from './appareil-single.component';

describe('AppareilSingleComponent', () => {
  let component: AppareilSingleComponent;
  let fixture: ComponentFixture<AppareilSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppareilSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
