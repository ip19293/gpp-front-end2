import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/admin/services/categorie.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-prof-matiere-add-edit',
  templateUrl: './prof-matiere-add-edit.component.html',
  styleUrls: ['./prof-matiere-add-edit.component.css'],
})
export class ProfMatiereAddEditComponent implements OnInit {
  matiereForm: FormGroup;
  categories: any;
  matieres: any;
  categorieSelected: any;
  id: any;
  constructor(
    private builder: FormBuilder,
    private service_categorie: CategorieService,
    private service_professeur: ProfesseurService,
    private toastr: ToastrService,
    private _dialog: MatDialogRef<ProfMatiereAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = localStorage.getItem('prof_id');
    this.matiereForm = this.builder.group({
      matieres: ['', Validators.required],
      categorie: ['', Validators.required],
    });
  }
  onFormSubmit() {
    if (this.matiereForm.valid) {
      this.service_professeur
        .addMatiereToProfesseur(this.id, this.matiereForm.value)
        .subscribe({
          next: (val: any) => {
            this.toastr.success(`${val.message}`, `${val.status}`);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status}`);
          },
        });

      console.log(this.matiereForm.value);
    }
  }

  getCategorie() {
    this.service_categorie.getAllCategories().subscribe((res: any) => {
      this.categories = res.categories;
      console.log(this.categories);
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

  ngOnInit(): void {
    this.getCategorie();
  }
}
