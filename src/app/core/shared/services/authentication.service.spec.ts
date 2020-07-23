import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/core/shared/model/user';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  login method run  correctly', () => {
    const user: User = { id: '2 ', name: 'Andres Lopez Restrepo' };
    service.login(user).subscribe((data) => expect(data).toEqual(null));
    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/api/user/login`
    );
    expect(request.request.method).toEqual('POST');
  });
});
