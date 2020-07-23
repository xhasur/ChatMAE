import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ConfigurationComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CdkTableModule,
  ],
  exports: [],
})
export class LayoutModule {}
