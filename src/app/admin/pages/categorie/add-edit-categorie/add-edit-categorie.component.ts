import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/admin/services/categorie.service';

@Component({
  selector: 'app-add-edit-categorie',
  templateUrl: './add-edit-categorie.component.html',
  styleUrls: ['./add-edit-categorie.component.css'],
})
export class AddEditCategorieComponent implements OnInit {
  categorieForm!: FormGroup;
  constructor(
    private builder: FormBuilder,
    private service: CategorieService,
    private _dialog: MatDialogRef<AddEditCategorieComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onFormSubmit() {
    if (this.categorieForm.valid) {
      if (this.data) {
        this.service
          .updateCategorie(this.data._id, this.categorieForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(`${val.message}`, `${val.status} `);
              this._dialog.close(true);
            },
            error: (err: any) => {
              let er = err.error.error;
              if (er.code == 11000) {
                this.toastr.error(
                  `Le nom de categorie dupliquée ${er.keyValue.name} !`,
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
        this.service.addCategorie(this.categorieForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`${val.message}`, `${val.status} `);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status} `);
          },
        });
      }
      console.log(this.categorieForm.value);
    }
  }
  ngOnInit(): void {
    this.categorieForm = this.builder.group({
      name: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.categorieForm.patchValue(this.data);
  }
}
