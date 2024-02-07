import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/admin/services/cours.service';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { MatiereService } from 'src/app/admin/services/matiere.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  role: any;
  id: any;
  isVide: any;
  cours: any = [];
  constructor(
    private router: Router,
    private matieres_services: MatiereService,
    private prof_services: ProfesseurService,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService,
    public service_cours: CoursService
  ) {
    this.role = localStorage.getItem('role');
    this.id = localStorage.getItem('user_id');
  }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.prof_services.getProfCoursNon(this.id).subscribe({
      next: (res) => {
        this.cours = res.cours;
        console.warn(this.cours.length);
        if (res.cours.length >= 1) {
          this.isVide = false;
        } else {
          this.isVide = true;
        }
      },
      error: (err) => {},
    });
  }
  signeCours(event: any, id: string) {
    this.service_cours.signeCours(id).subscribe({
      next: (res: any) => {
        this.getData();
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(`${err.error.message}`, `échec`);
      },
    });
  }
}
