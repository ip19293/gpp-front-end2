import { NgModule } from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { BodyComponent } from './components/body/body.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ChangePasswordComponent,
    BodyComponent,
    NavbarComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    AuthRoutingModule,
    MatSelectModule,
    NgSwitch,
    NgSwitchCase,
    MatFormFieldModule,
    MatCheckboxModule,
    AsyncPipe,
    MatRadioModule,
  ],
})
export class AuthModule {}
