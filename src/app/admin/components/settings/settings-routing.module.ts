import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ProfilComponent } from './profil/profil.component';
import { PersonnaliserComponent } from './personnaliser/personnaliser.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: 'settings/profil', component: ProfilComponent },
  { path: 'settings/customize', component: PersonnaliserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
