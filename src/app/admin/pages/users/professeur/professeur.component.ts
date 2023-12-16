import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AddEditProfesseurComponent } from './add-edit-professeur/add-edit-professeur.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css'],
})
export class ProfesseurComponent implements OnInit {
  displayedColumns: string[] = [
    'nom',
    'email',
    'mobile',
    'banque',
    'account',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: ProfesseurService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    this.getProfesseurs();
  }
  ngOnInit(): void {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
    this.getProfesseurs();
  }
  canShawSearchAsOverlay = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
  }
  checkCanShawSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShawSearchAsOverlay = true;
    } else {
      this.canShawSearchAsOverlay = false;
    }
  }
  getProfesseurs() {
    this.service.getAllProfesseurs().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.professeurs);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //console.warn(this.users.email);
    });
  }

  deleteProfesseur(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Are you sure',
        message: 'are you sure you wont to delete this professeur ?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteProfesseur(id).subscribe({
              next: (res: any) => {
                this.getProfesseurs();
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

  openAddProfesseurComp() {
    const dialogFef = this._dialog.open(AddEditProfesseurComponent, {
      width: '50%',
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurs();
        }
      },
    });
  }
  openEditProfesseurComp(data: any) {
    const dialogFef = this._dialog.open(AddEditProfesseurComponent, {
      width: '50%',
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurs();
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
