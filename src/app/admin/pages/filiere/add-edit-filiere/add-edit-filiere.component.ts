import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FiliereService } from 'src/app/admin/services/filiere.service';

@Component({
  selector: 'app-add-edit-filiere',
  templateUrl: './add-edit-filiere.component.html',
  styleUrls: ['./add-edit-filiere.component.css'],
})
export class AddEditFiliereComponent implements OnInit {
  filliereForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: FiliereService,
    private _dialog: MatDialogRef<AddEditFiliereComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onFormSubmit() {
    if (this.filliereForm.valid) {
      if (this.data) {
        this.service
          .updateFilliere(this.data._id, this.filliereForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(
                `the filliere has been updated successfully ...`,
                `${val.status} `
              );
              this._dialog.close(true);
            },
            error: (err: any) => {
              let er = err.error.error;
              if (er.code == 11000) {
                this.toastr.error(
                  `duplicate filliere name ${er.keyValue.name} !`,
                  `${err.error.status} `
                );
              } else {
                console.warn(err.error.error.code);
                this.toastr.error(
                  `${err.error.message}`,
                  `${err.error.status} `
                );
              }
            },
          });
      } else {
        this.service.addFilliere(this.filliereForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(
              `The filliere with name ${val.filliere.name} has been added successfully ...`,
              `${val.status} `
            );
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status} `);
          },
        });
      }
      console.log(this.filliereForm.value);
    }
  }
  ngOnInit(): void {
    this.filliereForm = this.builder.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.filliereForm.patchValue(this.data);
  }
}
