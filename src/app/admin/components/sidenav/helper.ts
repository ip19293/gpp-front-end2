import { trigger, transition, style, animate } from '@angular/animations';
import { IconDefinition, IconName } from '@fortawesome/free-solid-svg-icons';
export interface INavbarData {
  routerLink: string;
  icon?: IconDefinition;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
}

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('350ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('350ms', style({ opacity: 0 })),
  ]),
]);
