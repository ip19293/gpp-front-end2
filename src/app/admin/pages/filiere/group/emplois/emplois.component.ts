import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditEmploiComponent } from './add-edit-emploi/add-edit-emploi.component';
import { GroupsService } from 'src/app/admin/services/groups.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { EmploiService } from 'src/app/admin/services/emploi.service';

@Component({
  selector: 'app-emplois',
  templateUrl: './emplois.component.html',
  styleUrls: ['./emplois.component.css'],
})
export class EmploisComponent implements OnInit {
  idG: any;
  idS: any;
  displayedColumns: string[] = [
    'jour',
    'startTime',
    'finishTime',
    'professeur',
    'matiere',
    'action',
  ];
  groups: any;
  group: any;
  filliere: any;
  semestre: any;
  niveau: any;
  annee: any;
  description: any;
  dataSource!: MatTableDataSource<any>;

  dayName: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private builder: FormBuilder,
    public service: EmploiService,
    private service_group: GroupsService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService,
    private active: ActivatedRoute
  ) {
    this.active.params.subscribe((res: any) => {
      this.idG = res.idG;
      this.idS = res.idS;
      console.log(res.id);
    });
    localStorage.setItem('idG', this.idG);
    localStorage.setItem('idS', this.idS);
  }

  ngOnInit(): void {
    this.getGroupByIdEmplois();
  }

  getGroupByIdEmplois() {
    this.service_group.getGroupEmplois(this.idG).subscribe((res) => {
      console.log(res.status);
      this.dataSource = new MatTableDataSource(res.emplois);
      this.groups = res.groups;
      this.group = res.group;
      this.filliere = res.filliere;
      this.semestre = res.semestre;
      this.niveau = res.niveau;
      this.annee = res.annee;
      this.description = res.description;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.warn(res);
    });
  }
  removeEmploi(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Are you sure',
        message: 'are you sure you wont to delete this emploi ?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteEmploi(id).subscribe({
              next: (res) => {
                this.toastr.success(
                  `emploi delete ssuccesfully ...`,
                  `success`
                );
                this.getGroupByIdEmplois();
              },
              error: (err) => {
                this.toastr.error(`cann't deleted emploi !`, `faild`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddEmploiComp() {
    const dialogFef = this._dialog.open(AddEditEmploiComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGroupByIdEmplois();
        }
      },
    });
  }
  openEditEmploiComp(data: any) {
    const dialogFef = this._dialog.open(AddEditEmploiComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGroupByIdEmplois();
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
