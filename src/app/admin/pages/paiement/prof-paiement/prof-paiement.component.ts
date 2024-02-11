import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/admin/services/cours.service';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { PaiementService } from 'src/app/admin/services/paiement.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';
import { ChangePeriodeDialogComponent } from '../change-periode-dialog/change-periode-dialog.component';

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
  displayedClms: string[] = ['matiere', 'nbc', 'nbh', 'prix', 'montant'];
  cours: any;
  facture: any;
  dataSource!: MatTableDataSource<any>;
  dataSrs!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  nbc: String = 'Nombre de cours signés : ';
  nbh: String = 'Nombre d`heures de travail : ';
  ts: String = '  Montant(MRU) : ';
  tp: String = 'Total payament  ';
  fr: String = 'A partir de';
  t: String = 'Vers le';
  changePeriode = false;

  fromDate: any;
  toDate: any;
  id: any;
  prof: any;
  nom: any;
  prenom: any;
  email: any;
  mobile: any;
  total: any;
  data: any;
  count: any;
  somme: any;
  heuresTV: any;
  TH: any;
  intervalForm: FormGroup;
  paiementForm!: FormGroup;
  new: any;
  detail = false;

  constructor(
    private active: ActivatedRoute,
    private cours_service: CoursService,
    private prof_service: ProfesseurService,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private paiement_service: PaiementService,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      // console.log(res.id);
    });
    this.intervalForm = builder.group({
      debit: builder.control('', Validators.required),
      fin: builder.control('', Validators.required),
    });
  }
  openDialog(): void {
    const dialogRef = this._dialog.open(ChangePeriodeDialogComponent, {
      data: { fromDate: this.fromDate, toDate: this.toDate },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.fromDate = result.fromDate;
      this.toDate = result.toDate;
      let dt = {
        debit: result.fromDate,
        fin: result.toDate,
      };
      this.cours_service.getTotalCoursProf(this.id, dt).subscribe((res) => {
        this.count = res.total[0].NBC;
        this.heuresTV = res.total[0].NBH;
        this.TH = res.total[0].TH;
        this.somme = res.total[0].SOMME;
        this.cours = res.cours;
        this.facture = res.total;
        this.dataSource = new MatTableDataSource(res.cours);
        this.dataSrs = new MatTableDataSource(res.total);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.warn(res.cours);
      });
    });
  }
  ngOnInit(): void {
    this.getTotalCoursProf();
  }
  openChangePeriode(): void {
    this.changePeriode = !this.changePeriode;
  }
  savePaiement() {
    let data = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      professeur: this.id,
      nbh: this.heuresTV,
      nbc: this.count,
      th: this.TH,
      totalMontant: this.somme,
      cours: this.cours,
    };

    this.paiement_service.addPaiement(data).subscribe({
      next: (val: any) => {
        this.toastr.success(`${val.message}`, `${val.status} `);
        this.getTotalCoursProf();
      },
      error: (err: any) => {
        this.toastr.error(`${err.error.message}`, `${err.error.status} `);
      },
    });
  }
  onFormSubmit() {
    if (this.intervalForm.valid) {
      this.fromDate = this.intervalForm.value.debit;
      this.toDate = this.intervalForm.value.fin;
      this.cours_service
        .getTotalCoursProf(this.id, this.intervalForm.value)
        .subscribe((res) => {
          this.count = res.total[0].NBC;
          this.heuresTV = res.total[0].NBH;
          this.TH = res.total[0].TH;
          this.somme = res.total[0].SOMME;
          this.cours = res.cours;
          this.facture = res.total;
          this.dataSource = new MatTableDataSource(res.cours);
          this.dataSrs = new MatTableDataSource(res.total);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.warn(res.cours);
        });
      this.changePeriode = false;
    }
  }

  getTotalCoursProf() {
    this.cours_service
      .getTotalCoursProf(this.id, null)
      .subscribe((res: any) => {
        this.nom = res.professeur.nom;
        this.prenom = res.professeur.prenom;
        this.email = res.professeur.email;
        this.mobile = res.professeur.mobile;
        this.fromDate = res.date.debit;
        this.toDate = res.date.fin;
        this.count = res.total[0].NBC;
        this.heuresTV = res.total[0].NBH;
        this.TH = res.total[0].TH;
        this.somme = res.total[0].SOMME;
        this.cours = res.cours;
        this.facture = res.total;
        this.dataSource = new MatTableDataSource(res.cours);
        this.dataSrs = new MatTableDataSource(res.total);
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
