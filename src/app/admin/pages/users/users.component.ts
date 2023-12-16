import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../services/dialog.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;
  displayedColumns: string[] = [
    'nom',
    'email',
    'role',
    'active',
    'active-desactive',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  option: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  canShawSearchAsOverlay = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
  }
  constructor(
    public userServices: UserService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    this.getUsers();
  }
  ngOnInit(): void {
    this.checkCanShawSearchAsOverlay(window.innerWidth);
    this.getUsers();
  }
  checkCanShawSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShawSearchAsOverlay = true;
    } else {
      this.canShawSearchAsOverlay = false;
    }
  }
  getUsers() {
    this.userServices.getAllUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //console.warn(this.users.email);
    });
  }
  activeOrDeactiveUser(event: any, id: string) {
    this.userServices.activeOrDeactiveUser(id).subscribe((res) => {
      this.toastr.success(`${res.message}`, `${res.status}`);
      this.getUsers();
    });
  }

  deleteUser(enent: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Are you sure',
        message: 'are you sure you wont to delete this user ?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.userServices.deleteUser(id).subscribe({
              next: (resul: any) => {
                this.toastr.success(`User Delete ssucces!`, `success`);
                this.getUsers();
              },
              error: (err) => {
                this.toastr.error(`${err.error}`, `failed`);
              },
            });
          } else {
          }
        },
        error: (err) => {},
      });
  }

  openAddUserComp() {
    this.option = true;
    const dialogFef = this._dialog.open(AddEditUsersComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      },
    });
  }
  openEditUserComp(data: any) {
    const dialogFef = this._dialog.open(AddEditUsersComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
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
