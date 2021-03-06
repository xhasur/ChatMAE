import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/shared/model/user';
import { UserService } from './../../core/shared/services/user.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  user: User;
  formConfig: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(() => {
      if (this.activatedRoute.snapshot.params.id) {
        this.loadInformation(this.activatedRoute.snapshot.params.id);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  loadInformation(id: string): void {
    this.userService.getUser(id).subscribe((response) => {
      if (response['result']) {
        this.user = response['result'][0];
        this.setData(this.user);
      }
    });
  }

  initForm(): void {
    this.formConfig = this.formBuild.group({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      image: new FormControl(''),
    });
  }

  getControl(control: string): AbstractControl {
    return this.formConfig.get(control);
  }

  setData(user: User): void {
    this.getControl('name').setValue(user.name);
    this.getControl('username').setValue(user.username);
    this.getControl('password').setValue(user.password);
    this.getControl('image').setValue(user.image);
  }

  onSubmit(): void {
    if (this.formConfig.valid) {
      const user: User = this.formConfig.value;
      this.userService.updateUser(this.user.id, user).subscribe();
    }
  }
}
