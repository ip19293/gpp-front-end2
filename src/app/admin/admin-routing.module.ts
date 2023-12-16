import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListCategorieComponent } from './pages/categorie/list-categorie/list-categorie.component';

import { StatisticsComponent } from './components/statistics/statistics.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
      { path: 'dashbord', component: DashbordComponent },
      { path: 'statistics', component: StatisticsComponent },
      {
        path: '',
        loadChildren: () =>
          import('./components/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/categorie/list-categorie/list-categorie.module').then(
            (m) => m.ListCategorieModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/paiement/paiement.module').then(
            (m) => m.PaiementModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/filiere/filiere.module').then((m) => m.FiliereModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/emplois/emplois.module').then((m) => m.EmploisModule),
      },

      { path: 'categorie', component: ListCategorieComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
