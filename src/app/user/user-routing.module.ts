import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserModule } from './user.module';
import { UserComponent } from './user.component';
import { HomeComponent } from './pages/home/home.component';
import { EmploiComponent } from './pages/emploi/emploi.component';
import { CoursComponent } from './pages/cours/cours.component';
import { MatiereComponent } from './pages/matiere/matiere.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { HelpComponent } from './pages/help/help.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { MessageComponent } from './pages/message/message.component';
import { CoursListComponent } from './pages/cours-list/cours-list.component';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'emploi', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'emploi', component: EmploiComponent },
      { path: 'cours', component: CoursListComponent },
      { path: 'matieres', component: MatiereComponent },
      { path: 'paiement', component: PaiementComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'messages', component: MessageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
