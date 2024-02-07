import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { CoursService } from 'src/app/admin/services/cours.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css'],
})
export class CoursListComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'matiere',
    'type',
    'TH',
    'debit',
    'fin',
    'isSigne',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  id: any;

  constructor(
    public service_cours: CoursService,
    private prof_services: ProfesseurService
  ) {
    this.id = localStorage.getItem('user_id');
    this.getProfesseurCours();
  }
  ngOnInit(): void {
    this.getProfesseurCours();
  }

  getProfesseurCours() {
    this.prof_services.getProfesseurCoursSigned(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.cours);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      //console.warn(this.professeur.nom);
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
