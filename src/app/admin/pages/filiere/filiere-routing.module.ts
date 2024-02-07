import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiliereComponent } from './filiere.component';
import { AddEditFiliereComponent } from './add-edit-filiere/add-edit-filiere.component';
import { SemestreComponent } from './semestre/semestre.component';
import { GroupComponent } from './group/group.component';
import { AddEditSemestreComponent } from './semestre/add-edit-semestre/add-edit-semestre.component';
import { AddEditGroupComponent } from './group/add-edit-group/add-edit-group.component';
import { EmploisComponent } from './group/emplois/emplois.component';
import { ElementComponent } from './semestre/element/element.component';
import { FiliereDetailComponent } from './filiere-detail/filiere-detail.component';

const routes: Routes = [
  { path: 'filieres', component: FiliereComponent },
  { path: 'filieres/:id', component: FiliereDetailComponent },
  { path: 'filieres/:id/semestres', component: SemestreComponent },
  { path: 'filieres/:id/groupes', component: GroupComponent },
  { path: 'filieres/add-edit', component: AddEditFiliereComponent },
  {
    path: 'filieres/:id/semestres/add-edit',
    component: AddEditSemestreComponent,
  },
  {
    path: 'filieres/groupes/:id/groupes/add-edit',
    component: AddEditGroupComponent,
  },
  {
    path: 'filieres/:id/groupes/:idS/:idG',
    component: EmploisComponent,
  },
  {
    path: 'filieres/:id/semestres/:idS/elements',
    component: ElementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiliereRoutingModule {}
