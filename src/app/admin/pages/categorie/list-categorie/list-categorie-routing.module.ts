import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategorieComponent } from './list-categorie.component';
import { AddEditCategorieComponent } from '../add-edit-categorie/add-edit-categorie.component';
import { ListMatiereComponent } from '../matiere/list-matiere/list-matiere.component';
import { AddEditMatiereComponent } from '../matiere/add-edit-matiere/add-edit-matiere.component';

const routes: Routes = [
  { path: 'categorie', component: ListCategorieComponent },
  { path: 'categorie/add-edit', component: AddEditCategorieComponent },
  { path: 'matiere', component: ListMatiereComponent },
  { path: 'matiere/add-edit', component: AddEditMatiereComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCategorieRoutingModule {}
