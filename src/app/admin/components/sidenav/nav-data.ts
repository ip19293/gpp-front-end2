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
import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routerLink: 'dashbord',
    icon: faHome,
    label: 'Dashbord',
  },
  {
    routerLink: 'statistics',
    icon: faChartBar,
    label: 'Statistiques',
  },
  {
    routerLink: 'users',
    icon: faUsersGear,
    label: 'Utilisateurs',
    items: [
      {
        routerLink: 'users',
        label: 'Liste enregistré',
      },
      {
        routerLink: 'users/add-edit',
        label: 'Ajouter un(e) ',
      },
      {
        routerLink: 'professeurs',
        label: 'Enseignants',
        items: [
          {
            routerLink: 'professeurs',
            label: 'Liste enregistré',
          },
          {
            routerLink: 'professeurs/add-edit',
            label: 'Ajouter un(e)',
          },
        ],
      },
    ],
  },
  {
    routerLink: 'categorie',
    icon: faShapes,
    label: 'Catégories',
    items: [
      { routerLink: 'categorie', label: 'Liste enregistré' },
      { routerLink: 'categorie/add-edit', label: 'Ajouter une' },
      {
        routerLink: 'matiere',
        label: 'Matières',
        items: [
          { routerLink: 'matiere', label: 'Liste enregistré' },
          { routerLink: 'matiere/add-edit', label: 'Ajouter une' },
        ],
      },
    ],
  },
  {
    routerLink: 'filieres',
    icon: faBookOpenReader,
    label: 'Filières',
    items: [
      { routerLink: 'filieres', label: 'Liste enregistré' },
      { routerLink: 'filieres/add-edit', label: 'Ajouter une' },
      {
        routerLink: 'filieres',
        label: 'Semestres',
        items: [
          { routerLink: 'semestres', label: 'Liste enregistré' },
          { routerLink: 'semestres/add-edit', label: 'Ajouter un' },
        ],
      },
      {
        routerLink: 'groupes',
        label: 'Groupes',
        items: [
          { routerLink: 'groupes', label: 'Liste enregistré' },
          { routerLink: 'groupes/add-edit', label: 'Ajouter un' },
        ],
      },
    ],
  },

  {
    routerLink: 'emploi',
    icon: faCalendarDays,
    label: 'Emploi du temps',
    items: [
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
    ],
  },
  {
    routerLink: 'paiement',
    icon: faHandHoldingDollar,
    label: 'Paiement',
    items: [
      { routerLink: 'paiement', label: 'Les cotisations des enseignants' },
      { routerLink: 'paiement/liste-cree', label: 'Liste enregistré' },
      { routerLink: 'paiement/liste-termine', label: 'Liste terminé' },
      { routerLink: 'paiement/liste-valide', label: 'Liste validé' },
      { routerLink: 'paiement/liste-refuse', label: 'Liste refusé' },
    ],
  },
  {
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
  },
];
