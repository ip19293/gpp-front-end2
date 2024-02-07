import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FiliereService } from 'src/app/admin/services/filiere.service';
import { SemestresService } from 'src/app/admin/services/semestres.service';

@Component({
  selector: 'app-add-edit-semestre',
  templateUrl: './add-edit-semestre.component.html',
  styleUrls: ['./add-edit-semestre.component.css'],
})
export class AddEditSemestreComponent implements OnInit {
  semestreForm: FormGroup;
  matieres: any;

  data2: any;
  niveau: any;
  semestre_id: any;
  isExisteSemestre = false;
  semestreList = [
    { name: 'S1', value: 1 },
    { name: 'S2', value: 2 },
    { name: 'S3', value: 3 },
    { name: 'S4', value: 4 },
    { name: 'S5', value: 5 },
    { name: 'S6', value: 6 },
  ];
  semestres: any;
  constructor(
    private builder: FormBuilder,
    private service_filliere: FiliereService,
    private service_semestre: SemestresService,
    private _dialog: MatDialogRef<AddEditSemestreComponent>,
    private toastr: ToastrService,
    private active: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data != null) {
      this.data2 = {
        numero: data.numero,
        filliere: data.filliere,
        start: data.start,
        finish: data.finish,
      };
    }
    this.semestreForm = this.builder.group({
      numero: this.builder.control('', Validators.required),
      filliere: this.builder.control(''),
      start: this.builder.control('', Validators.required),
      finish: this.builder.control('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.semestreForm.patchValue(this.data2);
  }

  onFormSubmit() {
    this.semestreForm.value.filliere = localStorage.getItem('filliere');
    if (this.semestreForm.valid) {
      if (!this.data) {
        this.service_semestre.addSemestre(this.semestreForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`${val.message}`, `${val.status} `);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status} `);
          },
        });
      } else {
        this.service_semestre
          .updateSemestre(this.data._id, this.semestreForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(`${val.message}`, `${val.status} `);
              this._dialog.close(true);
            },
            error: (err: any) => {
              this.toastr.error(`${err.error.message}`, `${err.error.status} `);
            },
          });
      }
    }
  }
}
