import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ElementService } from 'src/app/admin/services/element.service';
import { SemestresService } from 'src/app/admin/services/semestres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { AddEditElemComponent } from './add-edit-elem/add-edit-elem.component';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css'],
})
export class ElementComponent implements OnInit {
  id: any;
  displayedColumns: string[] = [
    'name_EM',
    'code_EM',
    'credit',
    'professeurCM',
    'professeurTD',
    'professeurTP',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  filliere_id: any;
  filliere: any;
  description: any;
  semestre: any;
  niveau: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: ElementService,
    private service_semestre: SemestresService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService,
    private active: ActivatedRoute
  ) {
    this.active.params.subscribe((res: any) => {
      this.id = res.idS;
      console.log(res.idS);
    });
    localStorage.setItem('filliere', this.id);
  }
  ngOnInit(): void {
    this.getElementsBySemestreId();
  }

  getElementsBySemestreId() {
    this.service_semestre.getSemestreElements(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.elements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filliere = res.filliere;
      this.filliere_id = res._id;
      this.description = res.description;
      this.semestre = res.semestre;
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
                this.getElementsBySemestreId();
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
    const dialogFef = this._dialog.open(AddEditElemComponent, {
      id,
    });
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getElementsBySemestreId();
        }
      },
    });
  }
  openEditElementComp(data: any) {
    const dialogFef = this._dialog.open(AddEditElemComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getElementsBySemestreId();
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
