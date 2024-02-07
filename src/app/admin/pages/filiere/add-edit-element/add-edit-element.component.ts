import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/admin/services/categorie.service';
import { ElementService } from 'src/app/admin/services/element.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';

@Component({
  selector: 'app-add-edit-element',
  templateUrl: './add-edit-element.component.html',
  styleUrls: ['./add-edit-element.component.css'],
})
export class AddEditElementComponent implements OnInit {
  elementForm!: FormGroup;
  id: any;
  categories: any;
  categorie: any;
  categorieSelected: any;
  professeurs: any;
  matieres: any;
  matiere: any;
  debit_cours: any;
  matiereSelected: any;
  data2: any;
  CM: any;
  TP: any;
  TD: any;
  semestreList = [
    { name: 'S1', value: 1 },
    { name: 'S2', value: 2 },
    { name: 'S3', value: 3 },
    { name: 'S4', value: 4 },
    { name: 'S5', value: 5 },
    { name: 'S6', value: 6 },
  ];
  constructor(
    private builder: FormBuilder,
    private _dialog: MatDialogRef<AddEditElementComponent>,
    private service_categorie: CategorieService,
    private service_element: ElementService,
    private service_matiere: MatiereService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private active: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.elementForm = this.builder.group({
      filiere: this.builder.control(''),
      semestre: this.builder.control('', Validators.required),
      categorie: this.builder.control('', Validators.required),
      matiere: this.builder.control('', Validators.required),
      professeurCM: this.builder.control(''),
      professeurTP: this.builder.control(''),
      professeurTD: this.builder.control(''),
      heuresCM: this.builder.control('', Validators.required),
      heuresTP: this.builder.control('', Validators.required),
      heuresTD: this.builder.control('', Validators.required),
    });
    this.elementForm
      .get('matiere')
      ?.valueChanges.subscribe(async (res: any) => {
        if (res != '') {
          this.service_matiere
            .getProfesseursByMatiereId(res)
            .subscribe((res) => {
              this.professeurs = res.professeurs;
              this.cd.detectChanges();
            });
        }
      });
    this.elementForm
      .get('categorie')
      ?.valueChanges.subscribe(async (res: any) => {
        if (res != '') {
          this.service_categorie
            .getCategorieMatieres(res)
            .subscribe((res: any) => {
              this.matieres = res.matieres;
              this.cd.detectChanges();
            });
        }
      });
  }
  onFormSubmit() {
    this.elementForm.value.filiere = localStorage.getItem('filiere');
    console.log(this.elementForm.value);

    if (this.data) {
      console.log(this.elementForm.value);
      this.service_element
        .updateElement(this.data._id, this.elementForm.value)
        .subscribe({
          next: (val) => {
            this.toastr.success(`${val.message}`, `${val.status}`);
            this._dialog.close(true);
          },
          error: (err) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status}`);
          },
        });
    } else {
      this.service_element.addElement(this.elementForm.value).subscribe({
        next: (val: any) => {
          this.toastr.success(`cours create success !`, `${val.status}`);
          this._dialog.close(true);
        },
        error: (err: any) => {
          this.toastr.error(`${err.error.message}`, `${err.status}`);
        },
      });
    }
    // console.log(this.elementForm.value);
  }

  getCategorie() {
    this.service_categorie.getAllCategories().subscribe((res: any) => {
      this.categories = res.categories;
    });
  }
  getMatieres() {
    this.service_matiere.getAllMatieres().subscribe((res: any) => {
      this.matieres = res.matieres;
    });
  }

  onCategorieSelected(categorieSelected: any) {
    if (this.categorieSelected != null) {
      this.service_categorie
        .getCategorieMatieres(this.categorieSelected)
        .subscribe((res: any) => {
          this.matieres = res.matieres;
        });
    }
  }
  onMatiereSelected(matiereSelected: any) {
    if (this.matiereSelected != null) {
      this.service_matiere
        .getProfesseursByMatiereId(this.matiereSelected)
        .subscribe((res) => {
          this.professeurs = res.professeurs;
        });
    }
  }
  ngOnInit(): void {
    this.getCategorie();
    this.elementForm.patchValue(this.data);
  }
}
