import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { PaiementService } from 'src/app/admin/services/paiement.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],
})
export class PaiementComponent implements OnInit {
  @Input() nb_paiements: number = 0;
  displayedColumns: string[] = [
    'date',
    'fromDate',
    'toDate',
    'nbc',
    'nbh',
    'montant',
    'status',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  role: any;
  id: any;
  isVide: any;
  paiements: any = [];
  constructor(
    private router: Router,
    private paiement_services: PaiementService,
    private prof_services: ProfesseurService,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    this.role = localStorage.getItem('role');
    this.id = localStorage.getItem('user_id');
  }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.paiement_services.getPaiementsByProfesserId(this.id).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.paiements);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
        this.paiements = res.paiements;
        console.warn(this.paiements.length);
        if (res.paiements.length >= 1) {
          this.isVide = false;
        } else {
          this.isVide = true;
        }
      },
      error: (err) => {},
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
