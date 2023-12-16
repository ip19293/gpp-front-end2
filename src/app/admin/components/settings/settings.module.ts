import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PersonnaliserComponent } from './personnaliser/personnaliser.component';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [SettingsComponent, PersonnaliserComponent, ProfilComponent],
  imports: [CommonModule, SettingsRoutingModule],
})
export class SettingsModule {}
