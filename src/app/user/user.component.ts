import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesseurService } from '../admin/services/professeur.service';
import { UserService } from '../admin/services/user.service';
import { PaiementService } from '../admin/services/paiement.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user_id = localStorage.getItem('id');
  id: any;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  cours: any;
  constructor(
    private router: Router,
    private user_services: UserService,
    private prof_services: ProfesseurService,
    private paiement_services: PaiementService
  ) {}
  ngOnInit(): void {
    this.Profil();
  }

  Profil() {
    this.user_services.getUserById(this.user_id).subscribe({
      next: (res) => {
        this.nom = res.user.nom;
        this.prenom = res.user.prenom;
        this.email = res.user.email;
        if (res.user.role === 'professeur') {
          this.user_services.getProfesseur(res.user._id).subscribe({
            next: (res) => {
              localStorage.setItem('user_id', res.prof._id);
              this.id = res.prof._id;
              this.prof_services
                .getProfCoursNon(res.prof._id)
                .subscribe((res) => {
                  this.cours = res.cours;
                });
            },
            error: (err) => {},
          });
        } else {
          this.id = res.user._id;
          localStorage.setItem('user_id', res.user._id);
        }
      },
      error: (err) => {},
    });
  }
  getInfo() {
    return [this.id, this.nom, this.prenom, this.email];
  }
}
