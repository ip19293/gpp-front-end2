import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmploiService } from 'src/app/admin/services/emploi.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { SemestresService } from 'src/app/admin/services/semestres.service';

@Component({
  selector: 'app-add-edit-emploi',
  templateUrl: './add-edit-emploi.component.html',
  styleUrls: ['./add-edit-emploi.component.css'],
})
export class AddEditEmploiComponent implements OnInit {
  emploiForm!: FormGroup;
  daysOfWeek: string[] = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];

  elements: any;
  categorie: any;
  categorieSelected: any;
  professeurs: any;
  semestres: any;
  matieres: any;
  matiere: any;
  debit_plan: any;
  elementSelected: any;
  semestreSelected: any;
  data2: any;
  id: any;
  idS: any;
  CM: any;
  TP: any;
  TD: any;
  constructor(
    private builder: FormBuilder,
    private _dialog: MatDialogRef<AddEditEmploiComponent>,
    private service_matiere: MatiereService,
    private service_semestre: SemestresService,
    private service: EmploiService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = localStorage.getItem('idG');
    this.idS = localStorage.getItem('idS');
    this.debit_plan = [
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
    if (data != null) {
      this.data2 = {
        _id: data.id,
        startTime: data.startTime,
        dayNumero: data.day,
        professeur: data.professeur_id,
        matiere: data.matiere_id,
        type: data.type,
      };
    }
    this.emploiForm = this.builder.group({
      dayNumero: this.builder.control(0, Validators.required),
      professeur: this.builder.control('', Validators.required),
      matiere: this.builder.control('', Validators.required),
      type: this.builder.control('', Validators.required),
      nbh: this.builder.control(1.5, Validators.required),
      group: this.builder.control(this.id, Validators.required),
      startTime: this.builder.control('', Validators.required),
    });
    this.getElements();
    this.emploiForm.get('matiere')?.valueChanges.subscribe(async (res: any) => {
      if (res != '') {
        this.service_matiere.getProfOfMatieres(res).subscribe((res) => {
          this.professeurs = res.professeurs;
          this.cd.detectChanges();
        });
      }
    });
  }
  onFormSubmit() {
    //console.log(this.data);
    if (this.emploiForm.valid) {
      this.emploiForm.value.dayNumero = this.daysOfWeek.indexOf(
        this.emploiForm.value.dayNumero
      );
      if (this.data) {
        this.service
          .updateEmploi(this.data.id, this.emploiForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(`${val.message}`, `${val.status}`);
              this._dialog.close(true);
            },
            error: (err: any) => {
              this.toastr.error(`${err.error.message}`, `${err.error.status}`);
            },
          });
      } else {
        this.service.addEmploi(this.emploiForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`${val.message}`, `${val.status}`);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status}`);
          },
        });
      }
      console.log(this.emploiForm.value);
    } else {
      this.toastr.error('invalid! data');
    }
  }

  getElements() {
    this.service_semestre
      .getSemestreElements(this.idS)
      .subscribe((res: any) => {
        this.elements = res.elements;
      });
  }

  ngOnInit(): void {
    this.emploiForm.patchValue(this.data2);
  }
}
