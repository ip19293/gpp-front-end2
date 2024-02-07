import { Component, OnInit, ViewChild } from '@angular/core';
import { FiliereService } from 'src/app/admin/services/filiere.service';
import { SemestresService } from 'src/app/admin/services/semestres.service';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { AddEditSemestreComponent } from './add-edit-semestre/add-edit-semestre.component';

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css'],
})
export class SemestreComponent implements OnInit {
  id: any;
  displayedColumns: string[] = ['numero', 'start', 'finish', 'action'];
  dataSource!: MatTableDataSource<any>;
  filliere_id: any;
  filliere: any;
  description: any;
  niveau: any;
  space = '    ';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: SemestresService,
    private service_filliere: FiliereService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService,
    private active: ActivatedRoute
  ) {
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });
    localStorage.setItem('filliere', this.id);
    this.getFilliereById();
  }
  ngOnInit(): void {
    this.getFilliereById();
  }

  getFilliereById() {
    this.service_filliere.getFilliereById(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.semestres);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filliere = res.filliere;
      this.filliere_id = res._id;
      this.description = res.description;
      this.niveau = res.niveau;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      // console.warn(res);
    });
  }
  delete(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: `Etes-vous sùr de vouloir suprimer  cet semestre ?`,
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteSemestre(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getFilliereById();
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, `échec`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddSemestreComp(id: any) {
    const dialogFef = this._dialog.open(AddEditSemestreComponent, {
      id,
    });
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFilliereById();
        }
      },
    });
  }
  openEditSemestreComp(data: any) {
    const dialogFef = this._dialog.open(AddEditSemestreComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFilliereById();
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
