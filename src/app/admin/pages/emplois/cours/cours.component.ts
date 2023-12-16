import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/admin/services/cours.service';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { AddEditCoursComponent } from './add-edit-cours/add-edit-cours.component';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css'],
})
export class CoursComponent implements OnInit {
  displayedColumns: string[] = [
    'matiere',
    'professeur',
    'startDate',
    'startTime',
    'type',
    'finishTime',
    'isSigned',
    'action',
  ];
  isSigned: boolean = false;
  role = localStorage.getItem('role');
  cours: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public service: CoursService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private service_matiere: MatiereService,
    private dialog: DialogService
  ) {
    this.getCours();
  }
  ngOnInit(): void {
    this.getCours();
  }

  getCours() {
    this.service.getAllCours().subscribe({
      next: (res: any) => {
        this.cours = res.cours;
        this.dataSource = new MatTableDataSource(res.cours);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error(`${err.message}`, `failed`);
      },
    });
  }
  deleteCours(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Are you sure',
        message: 'are you sure you wont to delete this cours ?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteCours(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getCours();
              },
              error: (err) => {
                this.toastr.error(`${err.message}`, `fail`);
              },
            });
          } else {
          }
        },
      });
  }

  openAddCoursComp() {
    const dialogFef = this._dialog.open(AddEditCoursComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCours();
        }
      },
    });
  }
  openEditcoursComp(data: any) {
    const dialogFef = this._dialog.open(AddEditCoursComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCours();
        }
      },
    });
  }
  signeCours(id: string) {
    this.service.signeCours(id).subscribe({
      next: (res: any) => {
        this.getCours();
        this.toastr.success(`cours is signe`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(``, `${err.error.message}`);
      },
    });
  }
  signeAllCours() {
    this.service.signeAllCours().subscribe({
      next: (res: any) => {
        this.getCours();
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
