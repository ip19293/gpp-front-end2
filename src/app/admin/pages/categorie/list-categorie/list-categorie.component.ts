import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  faPlus,
  faEdit,
  faTrashCan,
  faRotate,
  faUsersGear,
  faGear,
  faRightToBracket,
  faCoins,
  faStamp,
  faShapes,
  faChartBar,
  faBookOpen,
  faHandHoldingDollar,
  faCalendarDay,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/admin/services/categorie.service';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { AddEditCategorieComponent } from '../add-edit-categorie/add-edit-categorie.component';
@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css'],
})
export class ListCategorieComponent implements OnInit {
  faEdit = faEdit;
  faTrashCan = faTrashCan;
  displayedColumns: string[] = [
    'name',
    'description',
    'prix',
    'matieres',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: CategorieService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.service.getAllCategories().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.categories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      //console.warn(this.users.email);
    });
  }
  deleteCategorie(event: any, id: string, name: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: 'Etes-vous sùr de vouloir suprimer cet catégorie ?',
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deleteCategorie(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getCategories();
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
  openAddCategorieComp() {
    const dialogFef = this._dialog.open(AddEditCategorieComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategories();
        }
      },
    });
  }
  openEditCategorieComp(data: any) {
    const dialogFef = this._dialog.open(AddEditCategorieComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategories();
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
