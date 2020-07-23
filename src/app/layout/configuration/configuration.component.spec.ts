import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from './../../core/shared/services/user.service';
import { ConfigurationComponent } from './configuration.component';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const userServiceMock = jasmine.createSpyObj('UserService', [
    'getUser',
    'updateUser',
  ]);
  userServiceMock.getUser.and.returnValue(of());
  userServiceMock.updateUser.and.returnValue(of());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{ useValue: userServiceMock, provide: UserService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOninit method run correctly and call initiform', () => {
    spyOn(component, 'initForm');
    component.ngOnInit();
    expect(component.initForm).toHaveBeenCalled();
  });

  it('should loadInformation method to call the method getUser of userService', () => {
    const id = '1';
    component.loadInformation(id);
    expect(userService.getUser).toHaveBeenCalledWith(id);
  });

  it('should onSubmit method to call the method updateUser of userService', () => {
    component.user = {
      id: '1',
      name: '',
    };
    component.formConfig.get('name').setValue('andres');
    component.formConfig.get('username').setValue('andrew');
    component.formConfig.get('image').setValue('http://');
    component.formConfig.get('password').setValue('123');
    component.onSubmit();
    expect(userService.updateUser).toHaveBeenCalled();
  });
});
