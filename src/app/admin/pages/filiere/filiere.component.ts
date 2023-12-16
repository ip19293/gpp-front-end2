import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../services/dialog.service';
import { FiliereService } from '../../services/filiere.service';
import { AddEditFiliereComponent } from './add-edit-filiere/add-edit-filiere.component';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css'],
})
export class FiliereComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'niveau', 'action'];
  dataSource!: MatTableDataSource<any>;
  space = '    ';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: FiliereService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getFillieres();
  }

  getFillieres() {
    this.service.getAllFillieres().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.fillieres);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //console.warn(this.users.email);
    });
  }
  deleteFilliere(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Are you sure',
        message: 'are you sure you wont to delete this filliere ?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteFilliere(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getFillieres();
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, `faild`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddFilliereComp() {
    const dialogFef = this._dialog.open(AddEditFiliereComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFillieres();
        }
      },
    });
  }
  openEditFilliereComp(data: any) {
    const dialogFef = this._dialog.open(AddEditFiliereComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFillieres();
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
