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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faClose,
  faAngleDown,
  faCloudUpload,
  faFileExcel,
  faMeh,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-list-matiere',
  templateUrl: './list-matiere.component.html',
  styleUrls: ['./list-matiere.component.css'],
})
export class ListMatiereComponent implements OnInit {
  displayedColumns: string[] = ['name', 'categorie', 'code', 'taux', 'action'];
  dataSource!: MatTableDataSource<any>;
  faFileExcel = faFileExcel;
  faCloudUpload = faCloudUpload;
  faMeh = faMeh;
  fileIsSelected = false;
  selectedFileName = null;
  data_length = 0;
  file: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: MatiereService,
    private builder: FormBuilder,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {
    this.getMatieres();
  }
  ngOnInit(): void {
    this.getMatieres();
  }
  uploads(event: any) {
    const file = event.currentTarget.files[0];
    const file_name = file.name;
    const file_type = file.type;
    const file_size = file.size;
    this.selectedFileName = file_name;
    if (
      file_type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      this.fileIsSelected = true;
      this.file = file;
    } else {
      this.toastr.error(
        `Le type de fichier sélectionné doit ètre xlsx`,
        'échec'
      );
    }
    // debugger;
  }
  onFormSubmit() {
    const formdata = new FormData();
    formdata.append('file', this.file);
    this.service.uploadsMatieres(formdata).subscribe({
      next: (res) => {
        this.toastr.success(`${res.message}`, `${res.status}`);
        this.getMatieres();
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, 'failed');
      },
    });
  }
  getMatieres() {
    this.service.getAllMatieres().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.matieres);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      console.warn(this.dataSource.filteredData.length);
      this.data_length = this.dataSource.filteredData.length;
    });
  }
  deleteMatiere(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: 'Etes-vous sùr  de vouloir suprimer cet matiére ?',
        confirmText: 'Oui',
        cancelText: 'Annuler',
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
