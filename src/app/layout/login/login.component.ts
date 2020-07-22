import { User } from './../shared/model/user';
import { AuthenticationService } from './../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuild: FormBuilder , private authenticationService :AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.initform();
  }

 

  initform(): void{
    this.formLogin = this.formBuild.group({
      user: new FormControl(
        '',
        [
          Validators.required,
        ],
        [
        ]
      ),
      password:  new FormControl(
        '',
        [
          Validators.required,
        ],
        [
        ]
      ),
    });
  }


  submitLogin(): void{
    if(this.formLogin.valid){
      const user: User  = this.formLogin.value;
      this.authenticationService.login(user).subscribe(
        response => {
         this.login(response);
        },
        error =>{
        }
      )
    }
  }


  login(data: any) : void{
    this.router.navigate(['/home']);
  }

  get user(): any {
    return this.formLogin.get('user');
  }


  get password(): any {
    return this.formLogin.get('password');
  }

}
