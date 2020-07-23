import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from 'src/app/core/shared/model/user';
import { AuthenticationService } from 'src/app/core/shared/services/authentication.service';
import { StorageService } from 'src/app/core/shared/services/storage.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;
  let storageService: jasmine.SpyObj<StorageService>;

  const user: User = {
    name: 'Andres Lopez',
    user: 'andres',
    password: '123',
    username: 'andres',
  };

  const authenticationServiceMock = jasmine.createSpyObj(
    'AuthenticationService',
    ['login']
  );
  authenticationServiceMock.login.and.returnValue(of([]));

  const storageServiceMock = jasmine.createSpyObj('StorageService', [
    'setCurrentSession',
  ]);
  storageServiceMock.setCurrentSession.and.returnValue(of());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { useValue: authenticationServiceMock, provide: AuthenticationService },
        { useValue: storageServiceMock, provide: StorageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authenticationService = TestBed.get(AuthenticationService);
    storageService = TestBed.get(StorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the ngOnInit method to be run corredctly ', () => {
    spyOn(component, 'initform');
    component.ngOnInit();
    expect(component.initform).toHaveBeenCalled();
  });

  it('should the login method to call to the method setCurrentSession in storageService ', () => {
    component.login(user);
    expect(storageService.setCurrentSession).toHaveBeenCalled();
  });

  it('should the submitLogin method to call to the method login in authenticationService ', () => {
    spyOn(component, 'login');
    component.formLogin.get('user').setValue('andres');
    component.formLogin.get('password').setValue('123');
    component.submitLogin();
    expect(authenticationService.login).toHaveBeenCalled();
  });
});
