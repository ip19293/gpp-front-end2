import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/admin/services/cours.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-prof-cours-add-edit',
  templateUrl: './prof-cours-add-edit.component.html',
  styleUrls: ['./prof-cours-add-edit.component.css'],
})
export class ProfCoursAddEditComponent implements OnInit {
  coursForm!: FormGroup;
  categories: any;
  categorieSelected: any;
  professeurs: any;
  matieres: any;
  matiereSelected: any;
  professeur: any;
  id: any;
  data2: any;
  debit_cours = [
    {
      date: '8H:00',
      value: '8:00',
    },
    {
      date: '8H:30',
      value: '8:30',
    },

    {
      date: '8H:45',
      value: '8:45',
    },
    {
      date: '9H',
      value: '9:00',
    },
    {
      date: '9H:30',
      value: '9:30',
    },
    {
      date: '9H:45',
      value: '9:45',
    },
    {
      date: '10H',
      value: '10:00',
    },
    {
      date: '10H:30',
      value: '10:30',
    },
    {
      date: '10H:45',
      value: '10:45',
    },
    {
      date: '11H',
      value: '11:00',
    },
    {
      date: '11H:30',
      value: '11:30',
    },
    {
      date: '11H:45',
      value: '11:45',
    },
    {
      date: '12H',
      value: '12:00',
    },
    {
      date: '12H:30',
      value: '12:30',
    },
    {
      date: '12H:45',
      value: '12:45',
    },
    {
      date: '13H',
      value: '13:00',
    },
    {
      date: '13H:30',
      value: '13:30',
    },
    {
      date: '13H:45',
      value: '13:45',
    },
    {
      date: '14H',
      value: '14:00',
    },
    {
      date: '14H:30',
      value: '14:30',
    },
    {
      date: '14H:45',
      value: '14:45',
    },
    {
      date: '15H',
      value: '15:00',
    },
    {
      date: '15H:30',
      value: '15:30',
    },
    {
      date: '15H:45',
      value: '15:45',
    },
    {
      date: '16H',
      value: '16:00',
    },
    {
      date: '16H:30',
      value: '16:30',
    },
    {
      date: '16H:45',
      value: '16:45',
    },
    {
      date: '17H',
      value: '17:00',
    },
    {
      date: '17H:30',
      value: '17:30',
    },
    {
      date: '17H:45',
      value: '17:45',
    },
  ];
  constructor(
    private active: ActivatedRoute,
    private builder: FormBuilder,
    private service: CoursService,
    private service_matiere: MatiereService,
    private _dialog: MatDialogRef<ProfCoursAddEditComponent>,
    private service_professeur: ProfesseurService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data != null) {
      this.data2 = {
        _id: data._id,
        date: data.date,
        startTime: data.startTime,
        isPaid: data.isPaid,
        isSigne: data.isSigne,
        matiere: data.matiere_id,
        TH: data.TH,
        type: data.type,
      };
    }

    this.id = localStorage.getItem('prof_id');
    this.coursForm = this.builder.group({
      date: this.builder.control('', Validators.required),
      matiere: this.builder.control('', Validators.required),
      professeur: this.builder.control(''),
      type: this.builder.control('CM', Validators.required),
      nbh: this.builder.control(1.5, Validators.required),
      startTime: this.builder.control('', Validators.required),
    });
  }
  onFormSubmit() {
    this.coursForm.value.professeur = this.id;
    this.coursForm.value.debit = parseInt(this.coursForm.value.debit);
    console.log(this.coursForm.value);
    if (this.coursForm.valid) {
      if (this.data) {
        this.service
          .updateCours(this.data._id, this.coursForm.value)
          .subscribe({
            next: (res: any) => {
              this.toastr.success(`${res.message}`, `${res.status}`);
              this._dialog.close(true);
            },
            error: (err: any) => {
              this.toastr.error(`${err.error.message}`, `${err.error.status}`);
            },
          });
      } else {
        this.service.addCours(this.coursForm.value).subscribe({
          next: (res: any) => {
            this.toastr.success(`${res.message}`, `${res.status}`);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status}`);
          },
        });
      }
      console.log(this.coursForm.value);
    }
  }
  ngOnInit(): void {
    this.coursForm.patchValue(this.data2);
    this.getProfesseurMatieres();
  }

  getProfesseurMatieres() {
    this.service_professeur.getProfesseur(this.id).subscribe((res: any) => {
      this.professeur = res.professeur;
      this.matieres = res.matieres;
      console.warn(res.professeur);
    });
  }
}
