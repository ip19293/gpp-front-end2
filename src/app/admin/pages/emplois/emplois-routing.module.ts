import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmploisComponent } from './emplois.component';
import { CoursComponent } from './cours/cours.component';
import { AddEditEmploiComponent } from './add-edit-emploi/add-edit-emploi.component';

const routes: Routes = [
  { path: 'emplois', component: EmploisComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'cours/list-non-signe', component: CoursComponent },
  { path: 'emplois/add-edit', component: AddEditEmploiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmploisRoutingModule {}
