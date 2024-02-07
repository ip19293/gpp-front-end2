import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/admin/services/user.service';
import { AddEditUsersComponent } from '../add-edit-users/add-edit-users.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;
  banques: any = ['BMCI', 'BNM'];
  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private _dialog: MatDialogRef<AddEditUsersComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.builder.group({
      nom: this.builder.control('', Validators.required),
      prenom: this.builder.control('', Validators.required),
      mobile: this.builder.control('', Validators.required),
      email: this.builder.control('', [Validators.required, Validators.email]),
      role: this.builder.control('', Validators.required),
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      accountNumero: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      banque: ['', Validators.required],
    });
  }
  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.userService
          .updateUser(this.data._id, this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(`${val.message} `, `${val.status}`);
              this._dialog.close(true);
            },
            error: (err) => {
              this.toastr.error(`${err.error.message}`, `échec`);
            },
          });
      } else {
        this.userService.addUser(this.userForm.value).subscribe({
          next: (res) => {
            this.toastr.success(`${res.message} `, `${res.status}`);
            this._dialog.close(true);
          },
          error: (err) => {
            this.toastr.error(`${err.error.message}`, `échec`);
          },
        });
      }
      console.log(this.userForm.value);
    }
  }
  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }
}
