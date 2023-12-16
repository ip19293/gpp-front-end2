import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { AddEditMatiereComponent } from '../add-edit-matiere/add-edit-matiere.component';

@Component({
  selector: 'app-list-matiere',
  templateUrl: './list-matiere.component.html',
  styleUrls: ['./list-matiere.component.css'],
})
export class ListMatiereComponent implements OnInit {
  displayedColumns: string[] = ['name', 'categorie', 'code', 'taux', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: MatiereService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getMatieres();
  }

  getMatieres() {
    this.service.getAllMatieres().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.matieres);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //console.warn(this.users.email);
    });
  }
  deleteMatiere(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Are you sure',
        message: 'are you sure you wont to delete this matiere ?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteMatiere(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getMatieres();
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, 'failed');
              },
            });
          } else {
          }
        },
      });
  }

  openAddMatiereComp() {
    const dialogFef = this._dialog.open(AddEditMatiereComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMatieres();
        }
      },
    });
  }
  openEditMatiereComp(data: any) {
    const dialogFef = this._dialog.open(AddEditMatiereComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMatieres();
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
