import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-add-edit-professeur',
  templateUrl: './add-edit-professeur.component.html',
  styleUrls: ['./add-edit-professeur.component.css'],
})
export class AddEditProfesseurComponent implements OnInit {
  professeurForm!: FormGroup;
  banques: any = ['BMCI', 'BNM'];
  matieres: any;
  constructor(
    private builder: FormBuilder,
    private service: ProfesseurService,
    private service_matiere: MatiereService,
    private toastr: ToastrService,
    private _dialog: MatDialogRef<AddEditProfesseurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onFormSubmit() {
    if (this.professeurForm.valid) {
      if (this.data) {
        this.service
          .updateProfesseur(this.data._id, this.professeurForm.value)
          .subscribe({
            next: (res: any) => {
              this.toastr.success(`${res.message}`, `${res.status}`);
              this._dialog.close(true);
            },
            error: (err: any) => {
              this.toastr.error(`${err.error.message}`, `failed`);
            },
          });
      } else {
        this.service.addProfesseur(this.professeurForm.value).subscribe({
          next: (res: any) => {
            this.toastr.success(`${res.message}`, `${res.status}`);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `failed`);
          },
        });
      }
      console.log(this.professeurForm.value);
    }
  }
  ngOnInit(): void {
    this.professeurForm = this.builder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      accountNumero: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      banque: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.professeurForm.patchValue(this.data);
    this.getmatiere();
  }

  getmatiere() {
    this.service_matiere.getAllMatieres().subscribe((res: any) => {
      this.matieres = res.matieres;
      console.log(this.matieres);
    });
  }
}
