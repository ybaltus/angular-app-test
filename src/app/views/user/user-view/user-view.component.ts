import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../models/User.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user-service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit, OnDestroy {
  users: User[];
  userSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      });
    this.userService.emitUsers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
