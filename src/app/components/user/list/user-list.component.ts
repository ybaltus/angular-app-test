import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../../../services/user-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() email: string;
  @Input() drinkPreference: string;
  @Input() hobbies: any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
