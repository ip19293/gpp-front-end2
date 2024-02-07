import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
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
  nomCompletForm = this.builder.group({
    nom: ['', [Validators.required]],
    prenom: ['', Validators.required],
  });
  contactForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
  });
  motPasseForm = this.builder.group({
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    role: ['', Validators.required],
  });
  professeurForm = this.builder.group({
    accountNumero: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    banque: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  /*   signupForm = this.builder.group({
    nom: ['', [Validators.required]],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
  }); */
  isEditable = true;
  isDisabled = true;
  ngOnInit(): void {}

  errorMessage: any;

  signup() {
    if (
      this.nomCompletForm.valid &&
      this.contactForm.valid &&
      this.motPasseForm.valid
    ) {
      let data = {
        nom: this.nomCompletForm.value.nom,
        prenom: this.nomCompletForm.value.prenom,
        email: this.contactForm.value.email,
        mobile: this.contactForm.value.mobile,
        password: this.motPasseForm.value.password,
        passwordConfirm: this.motPasseForm.value.passwordConfirm,
        role: this.motPasseForm.value.role,
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
}
