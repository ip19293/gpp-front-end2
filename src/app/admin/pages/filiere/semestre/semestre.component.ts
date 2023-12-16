import { Component, OnInit, ViewChild } from '@angular/core';
import { FiliereService } from 'src/app/admin/services/filiere.service';
import { SemestresService } from 'src/app/admin/services/semestres.service';
import { AddEditElementComponent } from './add-edit-element/add-edit-element.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css'],
})
export class SemestreComponent implements OnInit {
  id: any;
  displayedColumns: string[] = ['semestre', 'code_EM', 'element', 'action'];
  dataSource!: MatTableDataSource<any>;
  filliere: any;
  description: any;
  niveau: any;

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
    // console.warn(localStorage.getItem('filliere'));
  }
  ngOnInit(): void {
    this.getFilliereById();
  }

  getFilliereById() {
    this.service_filliere.getFilliereById(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.elements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filliere = res.filliere;
      this.description = res.description;
      this.niveau = res.niveau;
      // console.warn(res);
    });
  }
  deleteElement(event: any, id: string, idM: string) {
    this.dialog
      .confirmDialog({
        title: 'Es-tu sùr',
        message: 'Voulez vous vraiment supprimé cett element ?',
        confirmText: 'Oui',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.removeElementFromSemestre(id, idM).subscribe({
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
  openAddElementComp() {
    const dialogFef = this._dialog.open(AddEditElementComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFilliereById();
        }
      },
    });
  }
  openEditElementComp(data: any) {
    const dialogFef = this._dialog.open(AddEditElementComponent, {
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
