import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfMatiereAddEditComponent } from '../prof-matiere-add-edit/prof-matiere-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-prof-matiere',
  templateUrl: './prof-matiere.component.html',
  styleUrls: ['./prof-matiere.component.css'],
})
export class ProfMatiereComponent implements OnInit {
  displayedColumns: string[] = ['name', 'categorie', 'code', 'prix', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: any;
  nomComplet: any;
  prenom: any;
  email: any;
  mobile: any;
  matieres: any;
  prof_id: any;
  role = localStorage.getItem('role');
  constructor(
    private active: ActivatedRoute,
    private service: ProfesseurService,
    public service_matiere: MatiereService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    // console.log(this.active.snapshot.params);
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });
    if (this.role != 'professeur') {
      localStorage.setItem('prof_id', this.id);
    }
    // this.prof_id = localStorage.getItem('id');
  }

  ngOnInit(): void {
    this.getProfesseurDetail();
  }

  getProfesseurDetail() {
    this.service.getProfesseur(this.id).subscribe((res) => {
      try {
        if (res.status === 'succés') {
          this.id = res.professeur._id;
          this.nomComplet = res.professeur.nomComplet;
          this.email = res.professeur.email;
          this.mobile = res.professeur.mobile;
          this.matieres = res.matieres;
          this.dataSource = new MatTableDataSource(res.matieres);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      } catch (error) {
        console.log;
      }
    });
  }
  openAddMatiereComp() {
    const dialogFef = this._dialog.open(ProfMatiereAddEditComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurDetail();
        }
      },
    });
  }
  openEditMatiereComp(data: any) {
    const dialogFef = this._dialog.open(ProfMatiereAddEditComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurDetail();
        }
      },
    });
  }
  deleteOneMatFromProf(event: any, idM: any) {
    this.dialog
      .confirmDialog({
        title: 'Are you sure',
        message:
          'are you sure you wont to delete this matiere from list of this professeur ?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteOneMatFromProf(this.id, idM).subscribe({
              next: (val: any) => {
                this.toastr.success(`${val.message}`, `${val.status}`);
                this.getProfesseurDetail();
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
