import { Component, Input, OnInit } from '@angular/core';
import { INavbarData } from './helper';
import { Router } from '@angular/router';
import { UserService } from 'src/app/admin/services/user.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';
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
import { PaiementService } from 'src/app/admin/services/paiement.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user_id = localStorage.getItem('id');
  id: any;
  @Input() nom: string = '';
  @Input() user_info: string[] = [];
  cours_length: number = 0;
  faHandHoldingDollar = faHandHoldingDollar;
  nbc = 0;
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
    this.getData();
  }
  /*   getPaiements() {
    return this.paiements_length;
  } */
  getNbCours() {
    return this.cours_length;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
  getData() {
    this.prof_services.getProfCoursNon(this.id).subscribe({
      next: (res) => {
        this.cours_length = res.cours.length;
      },
      error: (err) => {},
    });
  }
  collapsed = true;
  sidnavWidth = this.collapsed ? '65px' : '250px';
  menuItems: INavbarData[] = [
    /*  {
      icon: 'dashboard',
      label: 'Dashboard',
      routerLink: 'dashboard',
    }, */
    {
      icon: 'schedule',
      label: 'Emploi du temps',
      routerLink: 'emploi',
    },
    {
      icon: 'checklist',
      label: 'Cours',
      routerLink: 'cours',
    },
    {
      icon: 'payment',
      label: 'Paiements',
      routerLink: 'paiement',
    },
    {
      icon: 'shield',
      label: 'Matiéres',
      routerLink: 'matieres',
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      routerLink: 'analytics',
    },
    {
      icon: 'help',
      label: 'Help',
      routerLink: 'help',
    },
  ];
}
