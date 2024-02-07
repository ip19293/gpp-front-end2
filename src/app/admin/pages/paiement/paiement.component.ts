import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaiementService } from '../../services/paiement.service';
import { DialogService } from '../../services/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],
})
export class PaiementComponent {
  displayedColumns: string[] = [
    'date',
    'professeur',
    'nbc',
    'th',
    'somme',
    'confirmation',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service_paiement: PaiementService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {
    this.getPaiements();
  }
  ngOnInit(): void {
    this.getPaiements();
  }

  getPaiements() {
    this.service_paiement.getPaiements().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.paiements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.warn(res.paiements);
    });
  }
  deletePaiement(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: 'Etes-vous sùr de vouloir suprimer cet paiement?',
        confirmText: 'Oui',
        cancelText: 'No',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service_paiement.deletePaiemenet(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getPaiements();
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, `erreur`);
              },
            });
          } else {
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
