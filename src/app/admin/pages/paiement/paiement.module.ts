import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaiementRoutingModule } from './paiement-routing.module';

import { ListRefusePaiementComponent } from './list-refuse-paiement/list-refuse-paiement.component';
import { ListTerminePaiementComponent } from './list-termine-paiement/list-termine-paiement.component';
import { ListValidePaiementComponent } from './list-valide-paiement/list-valide-paiement.component';
import { ListCreePaiementComponent } from './list-cree-paiement/list-cree-paiement.component';
import { PaiementComponent } from './paiement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfPaiementComponent } from './prof-paiement/prof-paiement.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    PaiementComponent,
    ListRefusePaiementComponent,
    ListTerminePaiementComponent,
    ListValidePaiementComponent,
    ListCreePaiementComponent,
    ProfPaiementComponent,
  ],
  imports: [
    CommonModule,
    PaiementRoutingModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
})
export class PaiementModule {}
