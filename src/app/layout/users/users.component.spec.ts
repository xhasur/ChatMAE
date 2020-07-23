import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/core/shared/services/user.service';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const userServiceMock = jasmine.createSpyObj('UserService', ['getUsers']);
  userServiceMock.getUsers.and.returnValue(of([]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [{ useValue: userServiceMock, provide: UserService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should the method getUsers be called when ngOninit is called', () => {
    component.ngOnInit();
    expect(userService.getUsers).toHaveBeenCalled();
  });
});
