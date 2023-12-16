import { Component, ViewChild } from '@angular/core';
import { ProfesseurService } from '../../services/professeur.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],
})
export class PaiementComponent {
  displayedColumns: string[] = ['professeur', 'nbc', 'nbh', 'somme', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: ProfesseurService,
    private router: Router,
    private _dialog: MatDialog
  ) {
    this.getProfesseurs();
  }
  ngOnInit(): void {
    this.getProfesseurs();
  }

  getProfesseurs() {
    this.service.getAllProfesseurs().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.professeurs);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.warn(res.professeurs);
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
