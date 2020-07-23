import { Component, OnInit } from '@angular/core';
import { Message } from './../../core/shared/model/message';
import { Room } from './../../core/shared/model/room';
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
  rooms: Room[];
  allUsers: User[];
  selectedUSer: User;
  isGroup: boolean;
  group: string;

  constructor(
    private chatService: ChatService,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  sendMessage(): void {
    if (this.isGroup) {
      const message: Message = {
        msg: this.message,
        userTo: null,
        userfrom: this.session.user.username,
        room: this.group,
        image: this.session.user.image,
      };
      this.chatService.sendMessageToGroup(message);
    } else {
      const toUser = this.selectedUSer.username;
      const message: Message = {
        msg: this.message,
        userTo: toUser,
        userfrom: this.session.user.username,
        image: this.session.user.image,
      };
      this.chatService.sendMessage(message);
    }

    this.message = '';
  }

  ngOnInit(): void {
    this.session = this.storageService.getCurrentSession();
    this.loadUsers();
    this.loadRooms();
    this.loadMessages();
  }

  loadRooms(): void {
    this.userService.getRooms().subscribe((response) => {
      this.rooms = response['result'];
      console.log('rooms', this.rooms);
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.allUsers = response['result'];
      this.users = response['result'].filter((user) => {
        return user.username !== this.session.user.username;
      });
    });
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe((message: Message) => {
      this.messages.push(message);
      if (this.isGroup) {
        this.chatService.joinGroup(this.group);
      } else {
        this.chatService.join(message.userfrom, message.userTo);
        //this.selectedUSer = this.findUSer(message.userfrom);
      }
    });
  }

  findUSer(username: string): User {
    return this.allUsers.reduce(
      (acc, tp) => (tp.username === username ? tp : acc),
      null
    );
  }

  selectUSerChat(user: User): void {
    this.isGroup = false;
    this.selectedUSer = user;
    this.messages = [];
    this.chatService.join(user.username, this.session.user.username);
  }

  selectGroup(group: string): void {
    this.messages = [];
    this.chatService.joinGroup(group);
    this.group = group;
    this.isGroup = true;
  }

  logOut(): void {
    this.storageService.logout();
  }
}
