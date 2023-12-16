import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiementComponent } from './paiement.component';
import { ListRefusePaiementComponent } from './list-refuse-paiement/list-refuse-paiement.component';
import { ListTerminePaiementComponent } from './list-termine-paiement/list-termine-paiement.component';
import { ListValidePaiementComponent } from './list-valide-paiement/list-valide-paiement.component';
import { ListCreePaiementComponent } from './list-cree-paiement/list-cree-paiement.component';
import { ProfPaiementComponent } from './prof-paiement/prof-paiement.component';

const routes: Routes = [
  { path: 'paiement', component: PaiementComponent },
  { path: 'paiement/:id', component: ProfPaiementComponent },
  { path: 'paiement/liste-refuse', component: ListRefusePaiementComponent },
  { path: 'paiement/liste-termine', component: ListTerminePaiementComponent },
  { path: 'paiement/liste-valide', component: ListValidePaiementComponent },
  { path: 'paiement/liste-cree', component: ListCreePaiementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaiementRoutingModule {}
