import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { ElementService } from 'src/app/admin/services/element.service';
import { FiliereService } from 'src/app/admin/services/filiere.service';
import { AddEditElementComponent } from '../add-edit-element/add-edit-element.component';
import {
  faClose,
  faAngleDown,
  faCloudUpload,
  faFileExcel,
  faMeh,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-filiere-detail',
  templateUrl: './filiere-detail.component.html',
  styleUrls: ['./filiere-detail.component.css'],
})
export class FiliereDetailComponent implements OnInit {
  faFileExcel = faFileExcel;
  faCloudUpload = faCloudUpload;
  faMeh = faMeh;
  id: any;
  fileIsSelected = false;
  selectedFileName = null;
  data_length = 0;
  file: any;
  displayedColumns: string[] = [
    'name_EM',
    'code_EM',
    /*   'credit', */
    'professeurCM',
    'professeurTD',
    'professeurTP',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  filliere_id: any;
  filiere: any;
  description: any;
  niveau: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: ElementService,
    private service_filiere: FiliereService,
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
    localStorage.setItem('filiere', this.id);
  }
  ngOnInit(): void {
    this.getElementsByfiliereId();
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
    this.service.uploadElements(this.id, formdata).subscribe({
      next: (res) => {
        this.toastr.success(`${res.message}`, `${res.status}`);
        this.getElementsByfiliereId();
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, 'failed');
      },
    });
  }
  getElementsByfiliereId() {
    this.service_filiere.getFilliereById(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.elements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filiere = res.filiere;
      this.filliere_id = res._id;
      this.description = res.description;
      this.filiere = res.filiere;
      this.niveau = res.niveau;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
    });
  }
  delete(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: `Etes-vous sùr de vouloir suprimer l'element ?`,
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deletEelement(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getElementsByfiliereId();
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
  openAddElementComp(id: any) {
    const dialogFef = this._dialog.open(AddEditElementComponent, {
      id,
    });
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getElementsByfiliereId();
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
          this.getElementsByfiliereId();
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
