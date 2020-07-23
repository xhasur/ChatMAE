import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Message } from './../model/message';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  let httpTestingController: HttpTestingController;

  const messages: Message[] = [
    {
      msg: 'Hello',
      room: 'AP',
      userTo: 'Peter',
      userfrom: 'Andres',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(ChatService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sendMessage method emit a value to the socket', () => {
    spyOn(service, 'getRoom');
    service.sendMessage(messages[0]);
    expect(service.getRoom).toHaveBeenCalled();
  });

  it('should  getRooms method run  correctly', () => {
    service.getRooms().subscribe();
    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/api/room`
    );
    expect(request.request.method).toEqual('GET');
  });

  it('should  loadChat method run  correctly', () => {
    const id = '1';
    service.loadChat(id).subscribe();
    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/api/chat/${id}`
    );
    expect(request.request.method).toEqual('GET');
  });

  it('should  getRoom method return a room id', () => {
    const to = 'Andres';
    const from = 'Pedro';
    const response = service.getRoom(to, from);
    expect(response).toEqual('AP');
  });

  it('should  updateChat method run correctly and update a chat', () => {
    const id = '1';
    service.updateChat(id, messages).subscribe();
    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/api/chat/${id}`
    );
    expect(request.request.method).toEqual('PUT');
  });
});
