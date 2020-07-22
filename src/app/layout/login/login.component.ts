import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/shared/model/user';
import { AuthenticationService } from '../../core/shared/services/authentication.service';
import { Session } from './../../core/shared/model/session';
import { StorageService } from './../../core/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initform();
  }

  initform(): void {
    this.formLogin = this.formBuild.group({
      user: new FormControl('', [Validators.required], []),
      password: new FormControl('', [Validators.required], []),
    });
  }

  submitLogin(): void {
    if (this.formLogin.valid) {
      const user: User = this.formLogin.value;
      this.authenticationService.login(user).subscribe(
        (response) => {
          if (response['status'] === 'success') {
            const userLogued = response['data'][0];
            this.login(userLogued);
          }
        },
        (error) => {}
      );
    }
  }

  login(user: User): void {
    const session: Session = {
      user: user,
      token: user._id,
    };
    this.storageService.setCurrentSession(session);
    this.router.navigate(['/home']);
  }

  get user(): any {
    return this.formLogin.get('user');
  }

  get password(): any {
    return this.formLogin.get('password');
  }
}
