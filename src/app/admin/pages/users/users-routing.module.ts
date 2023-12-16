import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { AddEditProfesseurComponent } from './professeur/add-edit-professeur/add-edit-professeur.component';
import { ProfMatiereComponent } from './professeur/prof-matiere/prof-matiere.component';
import { ProfMatiereAddEditComponent } from './professeur/prof-matiere-add-edit/prof-matiere-add-edit.component';
import { ProfCoursComponent } from './professeur/prof-cours/prof-cours.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/add-edit', component: AddEditUsersComponent },
  { path: 'professeurs', component: ProfesseurComponent },
  { path: 'professeurs/add-edit', component: AddEditProfesseurComponent },
  { path: 'professeurs/:id', component: ProfMatiereComponent },
  { path: 'professeurs/:id/cours', component: ProfCoursComponent },
  {
    path: 'professeurs/:id/add-matiere',
    component: ProfMatiereAddEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
