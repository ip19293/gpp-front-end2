import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/admin/services/cours.service';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';
import { ProfCoursAddEditComponent } from '../prof-cours-add-edit/prof-cours-add-edit.component';

@Component({
  selector: 'app-prof-cours',
  templateUrl: './prof-cours.component.html',
  styleUrls: ['./prof-cours.component.css'],
})
export class ProfCoursComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'matiere',
    'type',
    'debit',
    'fin',
    'isSigne',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: any;
  professeur: any;
  nomComplet: any;
  nom: any;
  prenom: any;
  email: any;
  coursNon = [];
  allsigne: String = '';
  isSigned: boolean = false;
  role = localStorage.getItem('role');
  constructor(
    private active: ActivatedRoute,
    private service: ProfesseurService,
    public service_cours: CoursService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    // console.log(this.active.snapshot.params);
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
      // localStorage.setItem('id', res.id);
    });
    this.getProfesseurCours();
    this.getProfesseurById();
  }
  ngOnInit(): void {}

  getProfesseurCours() {
    this.service.getProfesseurCours(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.cours);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.allsigne = '';
      this.isSigned = false;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      //console.warn(this.professeur.nom);
    });
  }
  getProfesseurCoursNon() {
    this.service.getProfCoursNon(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.cours);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.allsigne = 'Signe tout';
      if (res.cours.length != 0) {
        this.isSigned = true;
      }
      //console.warn(this.professeur.nom);
    });
  }
  getProfesseurById() {
    this.service.getProfesseur(this.id).subscribe((res) => {
      this.professeur = res.professeur;
      this.nom = res.professeur.nom;
      this.prenom = res.professeur.prenom;
      this.email = res.professeur.email;
    });
  }

  deleteCours(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: `Etes-vous sùr de vouloir suprimer la cour ?`,
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service_cours.deleteCours(id).subscribe({
              next: (res: any) => {
                this.getProfesseurCours();
                this.toastr.success(`${res.message}`, `${res.status}`);
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

  openAddcoursComp() {
    const dialogFef = this._dialog.open(ProfCoursAddEditComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurCours();
        }
      },
    });
  }
  openEditcoursComp(data: any, id: string) {
    const dialogFef = this._dialog.open(ProfCoursAddEditComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurCours();
        }
      },
    });
  }
  signeCours(id: string) {
    this.service_cours.signeCours(id).subscribe({
      next: (res: any) => {
        this.getProfesseurCours();
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(``, `${err.error.message}`);
      },
    });
  }
  signeAllCours() {
    this.service_cours.signeAllCours().subscribe({
      next: (res: any) => {
        this.getProfesseurCours();
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(``, `${err.error.message}`);
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
