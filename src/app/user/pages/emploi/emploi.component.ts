import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmploiService } from 'src/app/admin/services/emploi.service';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css'],
})
export class EmploiComponent implements OnInit {
  today: any;
  id: any;
  emplois: any;
  data: any;
  groupedEmploi: any;
  isVide: any;
  daysOfWeek = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  constructor(
    public emploi_service: EmploiService,
    private router: Router,
    private toastr: ToastrService,
    private active: ActivatedRoute
  ) {
    this.id = localStorage.getItem('user_id');
    let toDay = new Date();
    this.today = toDay.getDay();
    console.log(this.today);
  }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.emploi_service.getEmploisProfesseurById(this.id).subscribe({
      next: (res) => {
        this.emplois = res.emplois;
        this.groupedEmploi = res.groupedEmploi;
        this.data = res.data;
        console.warn(this.emplois.length);
        if (res.emplois.length >= 1) {
          this.isVide = false;
        } else {
          this.isVide = true;
        }
      },
      error: (err) => {},
    });
  }
}
