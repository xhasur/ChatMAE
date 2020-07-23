import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const user: User = {
    name: 'Andres Lopez',
    user: 'andrew',
    id: '1',
    password: '123',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  getUsers method run  correctly and return a list of users', () => {
    service.getUsers().subscribe();
    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/api/user`
    );
    expect(request.request.method).toEqual('GET');
  });

  it('should  getUsers method run  correctly and return a users', () => {
    const id = user.id;
    service.getUser(id).subscribe();
    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/api/user/${id}`
    );
    expect(request.request.method).toEqual('GET');
  });

  it('should  getUsers method run  correctly and return a users', () => {
    const id = user.id;
    service.updateUser(id, user).subscribe();
    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/api/user/${id}`
    );
    expect(request.request.method).toEqual('PUT');
  });
});
