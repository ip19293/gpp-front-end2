import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmit = false;
  isLogin: any;
  profileInfo: any;
  profile: any;
  error: any;
  non: String = `Don't have an account? `;
  role: any;
  constructor(
    private builder: FormBuilder,
    private service_auth: AuthService,
    private route: Router,
    private toastr: ToastrService /*   private prof_service: ProfesseurService */
  ) {}

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get fc() {
    return this.loginForm.controls;
  }
  errorMessage: any;

  login() {
    this.isSubmit = true;
    if (this.loginForm.invalid) return;
    this.profile = this.service_auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('id', res.data.user._id);
        this.role = localStorage.getItem('role');
        if (localStorage.getItem('role') == 'professeur') {
          /*   this.prof_service
            .getProfesseurByEmail(localStorage.getItem('email'))
            .subscribe({
              next: (re: any) => {
                localStorage.setItem('prof_id', re.professeur._id);
              },
              error: (err: any) => {
                console.log(err);
              },
            }); */
        }
        this.isLogin = true;
        if (this.role == 'admin') {
          this.route.navigate(['admin']);
        } else {
          this.route.navigate(['user']);
        }
        this.toastr.success(
          `Bienvenue  ${localStorage.getItem('role')} !`,
          `${res.status}`
        );
      },
      error: (err) => {
        //console.warn(err.error.isTrusted);
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
