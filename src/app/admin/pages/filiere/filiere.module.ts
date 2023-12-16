import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiliereRoutingModule } from './filiere-routing.module';
import { FiliereComponent } from './filiere.component';
import { AddEditFiliereComponent } from './add-edit-filiere/add-edit-filiere.component';
import { SemestreComponent } from './semestre/semestre.component';
import { AddEditSemestreComponent } from './semestre/add-edit-semestre/add-edit-semestre.component';
import { GroupComponent } from './group/group.component';
import { AddEditGroupComponent } from './group/add-edit-group/add-edit-group.component';
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
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { AddEditElementComponent } from './semestre/add-edit-element/add-edit-element.component';
import { EmploisComponent } from './group/emplois/emplois.component';
import { AddEditEmploiComponent } from './group/emplois/add-edit-emploi/add-edit-emploi.component';

@NgModule({
  declarations: [
    FiliereComponent,
    AddEditFiliereComponent,
    SemestreComponent,
    AddEditSemestreComponent,
    GroupComponent,
    AddEditGroupComponent,
    AddEditElementComponent,
    EmploisComponent,
    AddEditEmploiComponent,
  ],
  imports: [
    CommonModule,
    FiliereRoutingModule,
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
  ],
})
export class FiliereModule {}
