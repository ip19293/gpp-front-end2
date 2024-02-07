import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm!: FormGroup;
  isSubmit = false;
  constructor(
    private builder: FormBuilder,
    private auth_service: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.forgetForm = this.builder.group({
      email: this.builder.control('', [Validators.required, Validators.email]),
    });
  }
  ngOnInit(): void {}

  forget() {
    if (this.forgetForm.invalid) return;
    this.auth_service.forget(this.forgetForm.value).subscribe({
      next: (res) => {
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, `${err.error.status}`);
      },
    });
    this.forgetForm.reset();
  }
}
