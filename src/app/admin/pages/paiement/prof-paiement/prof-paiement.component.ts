import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/admin/services/cours.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-prof-paiement',
  templateUrl: './prof-paiement.component.html',
  styleUrls: ['./prof-paiement.component.css'],
})
export class ProfPaiementComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'matiere',
    'type',
    'debit',
    'fin',
    'TH',
    'prix',
    'somme',
  ];
  cours: any;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  nbc: String = 'Nombre des cours : ';
  nbh: String = 'Nombres d`heures : ';
  ts: String = '  Montant(MRU): ';
  tp: String = 'Total payament  ';
  fr: String = 'A partir de';
  t: String = 'Vers le';
  from: any;
  to: any;
  id: any;
  prof: any;
  nomComplet: any;
  email: any;
  mobile: any;
  total: any;
  data: any;
  count: any;
  somme: any;
  heuresTV: any;
  intervalForm: FormGroup;
  new: any;
  constructor(
    private active: ActivatedRoute,
    private cours_service: CoursService,
    private prof_service: ProfesseurService,
    private builder: FormBuilder
  ) {
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });
    this.intervalForm = builder.group({
      debit: builder.control('', Validators.required),
      fin: builder.control('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.getProfDetail();
    this.getTotalCoursProf();
  }
  onFormSubmit() {
    if (this.intervalForm.valid) {
      this.from = this.intervalForm.value.debit;
      this.to = this.intervalForm.value.fin;
      this.cours_service
        .getTotalCoursProf(this.id, this.intervalForm.value)
        .subscribe((res) => {
          this.count = res.professeur.nbc;
          this.heuresTV = res.professeur.nbh;
          this.somme = res.professeur.somme;
          //this.cours = res.cours;
          this.dataSource = new MatTableDataSource(res.cours);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    }
  }
  getProfDetail() {
    this.prof_service.getProfesseur(this.id).subscribe((res) => {
      this.prof = res.professeur;
      this.nomComplet = res.professeur.nomComplet;
      this.email = res.professeur.email;
      this.mobile = res.professeur.mobile;
      console.log(this.prof);
    });
  }

  getTotalCoursProf() {
    this.cours_service
      .getTotalCoursProf(this.id, null)
      .subscribe((res: any) => {
        this.from = res.first_cours_date;
        this.to = res.last_cours_date;
        this.count = res.professeur.nbc;
        this.heuresTV = res.professeur.nbh;
        this.somme = res.professeur.somme;
        this.cours = res.cours;
        this.dataSource = new MatTableDataSource(res.cours);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
