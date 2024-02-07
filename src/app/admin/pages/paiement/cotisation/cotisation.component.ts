import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-cotisation',
  templateUrl: './cotisation.component.html',
  styleUrls: ['./cotisation.component.css'],
})
export class CotisationComponent implements OnInit {
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
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
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
