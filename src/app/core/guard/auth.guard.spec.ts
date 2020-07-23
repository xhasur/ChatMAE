import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  const storageServiceMock = jasmine.createSpyObj('StorageService', [
    'isAuthenticated',
  ]);
  storageServiceMock.isAuthenticated.and.returnValue(of(true));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ useValue: storageServiceMock, provide: StorageService }],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should canActivate Method run correctly', () => {
    const response = guard.canActivate();
    expect(response).toBeTruthy();
  });
});
