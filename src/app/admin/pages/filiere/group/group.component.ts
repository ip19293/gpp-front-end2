import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';
import { GroupsService } from 'src/app/admin/services/groups.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  id: any;
  displayedColumns: string[] = ['niveau', 'semestre', 'group', 'action'];

  filliere: any;
  niveau: any;
  description: any;
  semestre: any;
  semestres: any;

  dataSource!: MatTableDataSource<any>;

  dayName: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service_group: GroupsService,
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
  }
  ngOnInit(): void {
    this.getAllGroupsByFilliereId();
  }
  onFormSubmit() {}
  getAllGroupsByFilliereId() {
    this.service_group.getAllGroupsByFilliereId(this.id).subscribe((res) => {
      console.log(res.status);
      this.dataSource = new MatTableDataSource(res.all_groups);
      this.filliere = res.filliere;
      this.niveau = res.niveau;
      this.description = res.description;
      this.semestres = res.list_semestres;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //console.warn(this.users.email);
    });
  }
  removeGroupById(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Are you sure',
        message: 'are you sure you wont to delete this group ?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service_group.removeGroupById(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getAllGroupsByFilliereId();
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, `failed`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddGroupComp() {
    const dialogFef = this._dialog.open(AddEditGroupComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllGroupsByFilliereId();
        }
      },
    });
  }
  openEditGroupComp(data: any) {
    const dialogFef = this._dialog.open(AddEditGroupComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllGroupsByFilliereId();
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
