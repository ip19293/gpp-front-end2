import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ProfesseurComponent } from './professeur/professeur.component';
import { UsersComponent } from './users.component';
import { AddEditProfesseurComponent } from './professeur/add-edit-professeur/add-edit-professeur.component';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
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
import { ProfMatiereComponent } from './professeur/prof-matiere/prof-matiere.component';
import { ProfMatiereAddEditComponent } from './professeur/prof-matiere-add-edit/prof-matiere-add-edit.component';
import { ProfCoursComponent } from './professeur/prof-cours/prof-cours.component';
import { ProfCoursAddEditComponent } from './professeur/prof-cours-add-edit/prof-cours-add-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
@NgModule({
  declarations: [
    UsersComponent,
    AddEditUsersComponent,
    ProfesseurComponent,
    AddEditProfesseurComponent,
    ProfMatiereComponent,
    ProfMatiereAddEditComponent,
    ProfMatiereAddEditComponent,
    ProfCoursComponent,
    ProfCoursAddEditComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    OverlayModule,
    CdkMenuModule,
  ],
})
export class UsersModule {}
