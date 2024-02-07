import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isSubmit = false;
  selectedRole!: string;
  isLogin: any;
  profileInfo: any;
  profile: any;
  error: any;
  non: String = `Don't have an account? `;
  banques: any = ['BMCI', 'BNM'];
  role: any;
  constructor(
    private builder: FormBuilder,
    private service_auth: AuthService,
    private route: Router,
    private toastr: ToastrService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  motPasseForm = this.builder.group({
    password: ['', Validators.required],
    email: ['', Validators.required],
  });
  professeurForm = this.builder.group({
    accountNumero: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    banque: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  isEditable = true;
  isDisabled = true;
  ngOnInit(): void {}

  errorMessage: any;

  signup() {
    if (this.motPasseForm.valid) {
      let data = {
        password: this.motPasseForm.value.password,
        email: this.motPasseForm.value.email,
        banque: this.professeurForm.value.banque,
        accountNumero: this.professeurForm.value.accountNumero,
      };

      this.service_auth.signup(data).subscribe({
        next: (res: any) => {
          this.route.navigate(['../auth/login']);
          this.toastr.success(`${res.message}`, `${res.status}`);
        },
        error: (err: any) => {
          console.warn(err);
          console.warn(
            '-----------------------------------------------------err.error'
          );

          /*    console.warn(err.error.error.errors.passwordConfirm.message);
          let dat = err.error.message.split(':');
          console.warn(dat); */
          if (err.error.error) {
            if (err.error.error.errors) {
              let ms = '';
              ms = err.error.error.errors.passwordConfirm
                ? `${err.error.error.errors.passwordConfirm.message}`
                : '';
              if (ms === '') {
                ms = err.error.error.errors.accountNumero
                  ? `${err.error.error.errors.accountNumero.message}`
                  : 'Erreur de validation !';
              }

              this.toastr.error(ms, `erreur`);
            } else if (err.error.error.code === 11000) {
              // Duplicate key error
              let ms =
                err.error.error.keyValue.email ||
                err.error.error.keyValue.mobile
                  ? 'Veuillez vérifier votre e-mail et votre numéro de téléphone !'
                  : '';
              this.toastr.error(ms, `erreur`);
            } else {
              this.toastr.error(`${err.error.message}`, `${err.error.status}`);
            }
          } else {
            // Other errors
            this.toastr.error(`${err.error}`, `erreur`);
          }
        },
      });
    }
  }

  login() {
    this.isSubmit = true;
    if (this.motPasseForm.invalid) return;
    this.profile = this.service_auth.login(this.motPasseForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('id', res.data.user._id);
        this.role = res.data.user.role;
        if (this.role == 'admin') {
          this.route.navigate(['admin']);
        } else if (this.role == 'responsable') {
          this.route.navigate(['user']);
        }
        this.toastr.success(
          `Bienvenue  ${localStorage.getItem('role')} !`,
          `${res.status}`
        );
      },
      error: (err) => {
        console.warn(err.error);
        if (err.error.loaded === 0) {
          this.toastr.error(`Server Connection refusé`, 'échec');
        } else {
          this.toastr.error(`${err.error.message}`, 'échec');
        }
      },
    });
  }
}
