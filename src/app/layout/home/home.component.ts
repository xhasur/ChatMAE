import { Component, OnInit } from '@angular/core';
import { Message } from './../../core/shared/model/message';
import { Session } from './../../core/shared/model/session';
import { User } from './../../core/shared/model/user';
import { ChatService } from './../../core/shared/services/chat.service';
import { StorageService } from './../../core/shared/services/storage.service';
import { UserService } from './../../core/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message: string;
  messages: Message[] = [];
  session: Session;
  users: User[];
  selectedUSer: User;

  constructor(
    private chatService: ChatService,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  sendMessage(): void {
    const toUser = this.selectedUSer.username;
    const message: Message = {
      msg: this.message,
      userTo: toUser,
      userfrom: this.session.user.username,
    };
    this.chatService.sendMessage(message);
    this.message = '';
  }

  ngOnInit(): void {
    this.session = this.storageService.getCurrentSession();
    this.loadUsers();
    this.loadMessages();
    this.chatService.join(this.session.user.username);
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response['result'].filter((user) => {
        return user.username !== this.session.user.username;
      });
    });
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe((message: Message) => {
      this.messages.push(message);
      console.log(message);
    });
  }

  selectUSerChat(user: User): void {
    this.selectedUSer = user;
    this.messages = [];
    this.chatService.join(user.username);
  }
}
