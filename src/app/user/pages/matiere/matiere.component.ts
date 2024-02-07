import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfMatiereAddEditComponent } from 'src/app/admin/pages/users/professeur/prof-matiere-add-edit/prof-matiere-add-edit.component';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css'],
})
export class MatiereComponent implements OnInit {
  role: any;
  id: any;
  isVide: any;
  matieres: any = [];
  constructor(
    private router: Router,
    private matieres_services: MatiereService,
    private prof_services: ProfesseurService,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    this.role = localStorage.getItem('role');
    this.id = localStorage.getItem('user_id');
  }
  ngOnInit(): void {
    this.getData();
  }
  deleteMatiere(event: any, id: any) {
    //console.warn(id);
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: 'Etes-vous sùr de vouloir suprimer cet matiére?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.prof_services.deleteOneMatFromProf(this.id, id).subscribe({
              next: (val: any) => {
                this.toastr.success(`${val.message}`, `${val.status}`);
                this.getData();
              },
              error: (err: any) => {
                this.toastr.error(`${err.error.message}`, `failed`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddMatiereComp() {
    const dialogFef = this._dialog.open(ProfMatiereAddEditComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getData();
        }
      },
    });
  }
  getData() {
    this.prof_services.getProfesseur(this.id).subscribe({
      next: (res) => {
        this.matieres = res.matieres;
        console.warn(this.matieres.length);
        if (res.matieres.length >= 1) {
          this.isVide = false;
        } else {
          this.isVide = true;
        }
      },
      error: (err) => {},
    });
  }
}
