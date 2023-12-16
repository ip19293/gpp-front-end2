import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElementService } from 'src/app/admin/services/element.service';
import { FiliereService } from 'src/app/admin/services/filiere.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { SemestresService } from 'src/app/admin/services/semestres.service';

@Component({
  selector: 'app-add-edit-element',
  templateUrl: './add-edit-element.component.html',
  styleUrls: ['./add-edit-element.component.css'],
})
export class AddEditElementComponent implements OnInit {
  elementForm: FormGroup;
  matieres: any;
  id: any;
  data2: any;
  niveau: any;
  semestre_id: any;
  idF: any;
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
    private service: ElementService,
    private service_filliere: FiliereService,
    private service_semestre: SemestresService,
    private service_matiere: MatiereService,
    private _dialog: MatDialogRef<AddEditElementComponent>,
    private toastr: ToastrService,
    private active: ActivatedRoute,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data != null) {
      this.data2 = {
        semestre: data.semestre,
        filliere: data.filliere,
        matiere: data.matiere._id,
      };
    }
    this.elementForm = this.builder.group({
      semestre: this.builder.control('', Validators.required),
      filliere: this.builder.control(''),
      matiere: this.builder.control('', Validators.required),
    });
    this.elementForm.value.filliere = localStorage.getItem('filliere');
    this.getFilliereById();
    this.getMatieries();
    this.elementForm
      .get('semestre')
      ?.valueChanges.subscribe(async (res: any) => {
        if (res != '') {
          for (let el in this.semestres) {
            if (res == this.semestres[el]) {
              this.isExisteSemestre = true;
              console.warn(`OK : S${this.semestres[el]} existe before ....`);
            }
          }
          if (this.isExisteSemestre) {
            this.service_semestre
              .getSemestreByNumero(res, this.idF)
              .subscribe((res) => {
                console.warn(res.semestre._id);
                this.semestre_id = res.semestre._id;
                this.cd.detectChanges();
              });
          } else {
            console.warn('not existe .................');
          }
        }
      });
  }
  ngOnInit(): void {
    this.elementForm.patchValue(this.data2);
  }
  getFilliereById() {
    this.service_filliere
      .getFilliereById(this.elementForm.value.filliere)
      .subscribe((res) => {
        this.niveau = res.niveau;
        this.idF = res._id;
        this.semestres = res.semestres;
        console.warn(this.idF);
        if (this.niveau == 'Master') {
          this.semestreList = [
            { name: 'S1', value: 1 },
            { name: 'S2', value: 2 },
            { name: 'S3', value: 3 },
            { name: 'S4', value: 4 },
          ];
        }
      });
  }
  onFormSubmit() {
    this.elementForm.value.filliere = localStorage.getItem('filliere');
    if (this.elementForm.valid) {
      if (!this.data) {
        if (!this.isExisteSemestre) {
          this.data = {
            filliere: this.idF,
            numero: this.elementForm.value.semestre,
            elements: [this.elementForm.value.matiere],
          };
          this.service_semestre.addSemestre(this.data).subscribe({
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
            .addElementToSemestre(
              this.semestre_id,
              this.elementForm.value.matiere
            )
            .subscribe({
              next: (val: any) => {
                this.toastr.success(`${val.message}`, `${val.status} `);
                this._dialog.close(true);
              },
              error: (err: any) => {
                this.toastr.error(
                  `${err.error.message}`,
                  `${err.error.status} `
                );
              },
            });
        }
      } else {
        this.service.addElement(this.elementForm.value).subscribe({
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

    // console.log(this.elementForm.value);
  }

  getMatieries() {
    this.service_matiere.getAllMatieres().subscribe((res: any) => {
      this.matieres = res.matieres;
    });
  }
}
