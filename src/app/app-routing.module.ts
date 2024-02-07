import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashbordComponent } from './user-dashbord/user-dashbord.component';

const routes: Routes = [
  {
    path: 'user-dashbord',
    component: UserDashbordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
