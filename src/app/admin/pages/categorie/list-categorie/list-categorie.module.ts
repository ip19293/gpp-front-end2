import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategorieRoutingModule } from './list-categorie-routing.module';
import { ListCategorieComponent } from './list-categorie.component';
import { ListMatiereComponent } from '../matiere/list-matiere/list-matiere.component';
import { AddEditMatiereComponent } from '../matiere/add-edit-matiere/add-edit-matiere.component';
import { AddEditCategorieComponent } from '../add-edit-categorie/add-edit-categorie.component';
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
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListCategorieComponent,
    AddEditCategorieComponent,
    ListMatiereComponent,
    AddEditMatiereComponent,
  ],
  imports: [
    CommonModule,
    ListCategorieRoutingModule,
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
export class ListCategorieModule {}
