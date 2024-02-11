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
  faSignOut,
  faCogs,
  faMortarBoard,
  faUsersBetweenLines,
  faUsersRectangle,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routerLink: 'dashbord',
    icon: faHome,
    label: 'Dashbord',
  },
  /*   {
    routerLink: 'statistics',
    icon: faChartBar,
    label: 'Statistiques',
  }, */
  {
    routerLink: 'users',
    icon: faUsersGear,
    label: 'Utilisateurs',
  },
  {
    icon: faUsersRectangle,
    routerLink: 'professeurs',
    label: 'Enseignants',
  },

  {
    routerLink: 'categorie',
    icon: faShapes,
    label: 'Catégories',
    items: [
      { routerLink: 'categorie', label: 'Catégories' },
      { routerLink: 'matiere', label: 'Matières' },
    ],
  },
  {
    routerLink: 'filieres',
    icon: faBookOpenReader,
    label: 'Filières',
  },

  {
    routerLink: 'emplois',
    icon: faCalendarDays,
    label: 'Emploi du temps',
    /*    items: [
      { routerLink: 'emplois', label: 'Liste enregistré' },
      { routerLink: 'emplois/add-edit', label: 'Ajouter un' },
      {
        routerLink: 'cours',
        label: 'Cours',
        items: [
          { routerLink: 'cours', label: 'Liste enregistré' },
          { routerLink: 'cours/list-non-signe', label: 'Liste non signé' },
          { routerLink: 'cours/list-non-signe', label: 'Nouvel cours' },
        ],
      },
    ], */
  },
  { routerLink: 'cours', icon: faCalendarCheck, label: 'Cours' },
  {
    routerLink: 'paiement',
    icon: faHandHoldingDollar,
    label: 'Paiement',
    items: [
      { routerLink: 'paiement', label: 'Les cotisations des enseignants' },
      { routerLink: 'paiement/liste-cree', label: 'Paiements' },
    ],
  },
  /*   {
    routerLink: 'settings',
    icon: faGear,
    label: 'Paramètres',
    expanded: true,
    items: [
      {
        routerLink: 'settings/profil',
        label: 'Profil',
      },
      {
        routerLink: 'settings/customize',
        label: 'Personnaliser',
      },
    ],
  }, */
];
