import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewComponent } from './user-new.component';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../../services/user-service';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserNewComponent', () => {
  let component: UserNewComponent;
  let fixture: ComponentFixture<UserNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        UserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
