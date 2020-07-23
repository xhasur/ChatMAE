import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/core/shared/model/user';
import { StorageService } from 'src/app/core/shared/services/storage.service';
import { UserService } from 'src/app/core/shared/services/user.service';
import { Message } from './../../core/shared/model/message';
import { Session } from './../../core/shared/model/session';
import { ChatService } from './../../core/shared/services/chat.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let chatService: jasmine.SpyObj<ChatService>;
  let storageService: jasmine.SpyObj<StorageService>;

  const user: User = {
    id: '1',
    name: 'Andres Lopez R',
    username: 'andres',
    password: '123',
    user: 'andres',
    image: 'http://',
  };

  const session: Session = {
    token: 'tokn',
    user: user,
  };

  const message: Message = {
    msg: 'Hello',
    room: 'AP',
    userTo: 'Pepe',
    userfrom: 'Andres',
  };

  const storageServiceMock = jasmine.createSpyObj('StorageService', [
    'setCurrentSession',
    'getCurrentSession',
    'logout',
  ]);
  storageServiceMock.setCurrentSession.and.returnValue(of());
  storageServiceMock.getCurrentSession.and.returnValue(session);

  const chatServiceMock = jasmine.createSpyObj('ChatService', [
    'sendMessageToGroup',
    'sendMessage',
    'getRooms',
    'getMessages',
    'updateChat',
    'joinGroup',
    'loadChat',
    'join',
  ]);
  chatServiceMock.sendMessageToGroup.and.returnValue(of());
  chatServiceMock.getRooms.and.returnValue(of());
  chatServiceMock.getMessages.and.returnValue(of());
  chatServiceMock.updateChat.and.returnValue(of());
  chatServiceMock.loadChat.and.returnValue(of());

  const userServiceMock = jasmine.createSpyObj('UserService', [
    'getUser',
    'getUsers',
    'updateUser',
  ]);
  userServiceMock.getUser.and.returnValue(of(user));
  userServiceMock.getUsers.and.returnValue(
    of({
      result: [user],
    })
  );
  userServiceMock.updateUser.and.returnValue(of());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { useValue: userServiceMock, provide: UserService },
        { useValue: storageServiceMock, provide: StorageService },
        { useValue: chatServiceMock, provide: ChatService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    userService = TestBed.get(UserService);
    chatService = TestBed.get(ChatService);
    storageService = TestBed.get(StorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component, 'loadUsers');
    spyOn(component, 'loadRooms');
    spyOn(component, 'loadMessages');
    expect(component).toBeTruthy();
  });

  it('should ngOnInit to be called correctly', () => {
    spyOn(component, 'loadUsers');
    spyOn(component, 'loadRooms');
    spyOn(component, 'loadMessages');
    component.ngOnInit();
    expect(storageService.getCurrentSession).toHaveBeenCalled();
  });

  it('should the method loadRooms to get the complete list of rooms for chatting', () => {
    component.loadRooms();
    expect(chatService.getRooms).toHaveBeenCalled();
  });

  it('should the method loadMessages to get a  list of previus messages', () => {
    component.loadMessages();
    expect(chatService.getMessages).toHaveBeenCalled();
  });

  it('should the method saveChat to call saveChat in chatService and save the messages', () => {
    component.saveChat([message]);
    expect(chatService.updateChat).toHaveBeenCalled();
  });
  it('should the method logOut to call logout in storageService and log out', () => {
    component.logOut();
    expect(storageService.logout).toHaveBeenCalled();
  });

  it('should the method selectGroup and  selectUSerChat to call loadChat in chatService', () => {
    component.selectGroup('Admin');
    expect(chatService.loadChat).toHaveBeenCalled();

    component.selectUSerChat(user);
    expect(chatService.loadChat).toHaveBeenCalled();
  });
});
