import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/shared/model/user';
import { UserService } from './../../core/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public DisplayedColumns: string[] = ['name', 'username', 'image'];
  public usersDataSource: BehaviorSubject<User[]>;

  public StudentData: User[] = [{ name: 'John' }];

  constructor(private userService: UserService) {
    this.usersDataSource = new BehaviorSubject<User[]>(null);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response) => {
      const uSerResponse: User[] = response['result'];
      this.usersDataSource.next(uSerResponse);
    });
  }
}
