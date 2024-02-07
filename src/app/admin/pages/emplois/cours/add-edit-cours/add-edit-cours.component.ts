import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/admin/services/categorie.service';
import { CoursService } from 'src/app/admin/services/cours.service';
import { ElementService } from 'src/app/admin/services/element.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-add-edit-cours',
  templateUrl: './add-edit-cours.component.html',
  styleUrls: ['./add-edit-cours.component.css'],
})
export class AddEditCoursComponent implements OnInit {
  coursForm!: FormGroup;
  elements: any;
  groupes: any;
  professeurSelected: any;
  professeurs: any;
  matieres: any;
  matiere: any;
  debit_cours: any;
  matiereSelected: any;
  elementSelected: any;
  data2: any;
  CM: any;
  TP: any;
  TD: any;
  constructor(
    private builder: FormBuilder,
    private service: CoursService,
    private _dialog: MatDialogRef<AddEditCoursComponent>,
    private service_element: ElementService,
    private service_professeur: ProfesseurService,
    private service_matiere: MatiereService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.debit_cours = [
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
        _id: data._id,
        date: data.date,
        startTime: data.startTime,
        isPaid: data.isPaid,
        isSigne: data.isSigne,
        element: data.element,
        professeur: data.professeur_id,
        matiere: data.matiere_id,
        categorie: data.categorie_id,
        type: data.type,
        nbh: data.nbh,
        group: data.group,
      };
    }
    this.coursForm = this.builder.group({
      date: this.builder.control('', Validators.required),
      professeur: this.builder.control('', Validators.required),
      matiere: this.builder.control('', Validators.required),
      element: this.builder.control('', Validators.required),
      type: this.builder.control('', Validators.required),
      nbh: this.builder.control(1.5, Validators.required),
      startTime: this.builder.control('', Validators.required),
    });
    this.coursForm.get('matiere')?.valueChanges.subscribe(async (res: any) => {
      if (res != '') {
        this.service_matiere.getElementsByMatiereId(res).subscribe((res) => {
          this.elements = res.elements;
          this.cd.detectChanges();
        });
      }
    });
    this.coursForm
      .get('professeur')
      ?.valueChanges.subscribe(async (res: any) => {
        if (res != '') {
          this.service_professeur.getProfesseur(res).subscribe((res: any) => {
            this.matieres = res.matieres;
            this.cd.detectChanges();
          });
        }
      });
    /*    this.coursForm.get('element')?.valueChanges.subscribe(async (res: any) => {
      if (res != '') {
        this.service_element.getGroupsByElementId(res).subscribe((res: any) => {
          this.groupes = res.groupes;
          this.cd.detectChanges();
        });
      }
    }); */
  }
  onFormSubmit() {
    console.log(this.coursForm.value);
    if (this.coursForm.valid) {
      if (this.data) {
        console.log(this.coursForm.value);
        this.service
          .updateCours(this.data._id, this.coursForm.value)
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
        this.service.addCours(this.coursForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`cours create success !`, `${val.status}`);
            this._dialog.close(true);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status}`);
          },
        });
      }
      console.log(this.coursForm.value);
    } else {
      this.toastr.error('invalid! data');
    }
  }

  /*  getCategorie() {
    this.service_categorie.getAllCategories().subscribe((res: any) => {
      this.categories = res.categories;
    });
  } */
  getProfesseurs() {
    this.service_professeur.getAllProfesseurs().subscribe((res: any) => {
      this.professeurs = res.professeurs;
    });
  }
  /*  getMatieres() {
    this.service_matiere.getAllMatieres().subscribe((res: any) => {
      this.matieres = res.matieres;
    });
  } */

  onprofesseurSelected(professeurSelected: any) {
    if (this.professeurSelected != null) {
      this.service_professeur
        .getProfesseur(this.professeurSelected)
        .subscribe((res: any) => {
          this.matieres = res.matieres;
        });
    }
  }
  onMatiereSelected(matiereSelected: any) {
    if (this.matiereSelected != null) {
      this.service_matiere
        .getElementsByMatiereId(this.matiereSelected)
        .subscribe((res) => {
          this.elements = res.elements;
        });
    }
  }
  onElementSelected(elementSelected: any) {
    if (this.elementSelected != null) {
      this.service_element
        .getGroupsByElementId(this.elementSelected)
        .subscribe((res) => {
          this.groupes = res.groupes;
        });
    }
  }
  ngOnInit(): void {
    this.getProfesseurs();
    this.coursForm.patchValue(this.data2);
  }
}
