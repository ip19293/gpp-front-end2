import { NgModule } from '@angular/core';
import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { UserRoutingModule } from './user-routing.module';
import { BodyComponent } from './components/body/body.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { EmploiComponent } from './pages/emploi/emploi.component';
import { CoursComponent } from './pages/cours/cours.component';
import { MatiereComponent } from './pages/matiere/matiere.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { HelpComponent } from './pages/help/help.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationComponent } from './pages/notification/notification.component';
import { MessageComponent } from './pages/message/message.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CoursListComponent } from './pages/cours-list/cours-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FrenchDayPipe } from './pipes/french-day.pipe';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { TopWidgetComponent } from './pages/dashboard/top-widget/top-widget.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [
    UserComponent,
    BodyComponent,
    NavbarComponent,
    CustomSidenavComponent,
    HomeComponent,
    EmploiComponent,
    CoursComponent,
    MatiereComponent,
    AnalyticsComponent,
    HelpComponent,
    NotificationComponent,
    MessageComponent,
    CoursListComponent,
    FrenchDayPipe,
    PaiementComponent,
    DashboardComponent,
    TopWidgetComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    AuthRoutingModule,
    MatSelectModule,
    NgSwitch,
    NgSwitchCase,
    MatFormFieldModule,
    MatCheckboxModule,
    UserRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    CdkAccordionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
  ],
})
export class UserModule {}
