import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHome,
  faUsersGear,
  faGear,
  faRightToBracket,
  faCoins,
  faStamp,
  faShapes,
  faChartBar,
  faBookOpen,
  faHandHoldingDollar,
  faCalendarDay,
  faCalendarDays,
  faSitemap,
  faBookOpenReader,
} from '@fortawesome/free-solid-svg-icons';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';
import { UserService } from 'src/app/admin/services/user.service';
import { INavbarData } from '../navbar/helper';
import { PaiementService } from 'src/app/admin/services/paiement.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  nb_paiements: number = 0;
  nb_cours: number = 0;

  user_id = localStorage.getItem('id');
  id: any;
  nom: any;
  prenom: any;
  email: any;
  faHandHoldingDollar = faHandHoldingDollar;
  nbc = 0;
  nbp = 0;
  menuTopItems: INavbarData[] = [];
  constructor(
    private router: Router,
    private user_services: UserService,
    private prof_services: ProfesseurService,
    private paiement_services: PaiementService
  ) {
    this.user_id = localStorage.getItem('id');
  }
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
              this.prof_services
                .getProfCoursNon(res.prof._id)
                .subscribe((res) => {
                  this.nbc = res.cours.length;
                  this.menuTopItems.push({
                    icon: 'message',
                    label: 'Messages',
                    routerLink: 'messages',
                    nbE: this.nbc,
                  });
                  //   console.warn(res.cours.length);
                  this.paiement_services
                    .getPaiementsByProfesserId(
                      localStorage.getItem('user_id'),
                      { notification: 'yes' }
                    )
                    .subscribe({
                      next: (res) => {
                        this.nbp = res.paiements.length;
                        this.menuTopItems.push({
                          icon: 'notifications_none',
                          label: 'Notifications',
                          routerLink: 'notification',
                          nbE: this.nbp,
                        });
                      },
                      error: (err) => {},
                    });
                });
            },
            error: (err) => {},
          });
        } else {
          localStorage.setItem('user_id', res.user._id);
        }
      },
      error: (err) => {},
    });
  }
  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
