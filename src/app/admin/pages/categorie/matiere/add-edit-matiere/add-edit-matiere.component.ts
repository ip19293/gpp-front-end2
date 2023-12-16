import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/admin/services/categorie.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';

@Component({
  selector: 'app-add-edit-matiere',
  templateUrl: './add-edit-matiere.component.html',
  styleUrls: ['./add-edit-matiere.component.css'],
})
export class AddEditMatiereComponent implements OnInit {
  matiereForm!: FormGroup;
  categories: any;
  constructor(
    private builder: FormBuilder,
    private service: MatiereService,
    private _dialog: MatDialogRef<AddEditMatiereComponent>,
    private service_categorie: CategorieService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onFormSubmit() {
    if (this.matiereForm.valid) {
      if (this.data) {
        this.service
          .updateMatiere(this.data._id, this.matiereForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(
                `the subject ${val.matiere.name} has been updated successfully ... `,
                `${val.status} `
              );
              this._dialog.close(true);
            },
            error: (err: any) => {
              let er = err.error.error;
              if (er.code == 11000) {
                this.toastr.error(
                  `duplicate matiere name ${er.keyValue.name} !`,
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
        this.service.addMatiere(this.matiereForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(
              `The matiere has been added successfully ...`,
              `${val.status} `
            );
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status} `);
          },
        });
      }
      // console.log(this.matiereForm.value);
    }
  }
  ngOnInit(): void {
    this.matiereForm = this.builder.group({
      name: ['', Validators.required],
      categorie: ['', Validators.required],
    });
    this.matiereForm.patchValue(this.data);
    this.getCategorie();
  }

  getCategorie() {
    this.service_categorie.getAllCategories().subscribe((res: any) => {
      this.categories = res.categories;
      // console.log(this.categories);
    });
  }
}
