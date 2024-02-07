import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/admin/services/dialog.service';
import { PaiementService } from 'src/app/admin/services/paiement.service';
import { ProfesseurService } from 'src/app/admin/services/professeur.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  role: any;
  id: any;
  isVide: any;
  paiements: any = [];
  
  constructor(
    private router: Router,
    private paiement_services: PaiementService,
    private prof_services: ProfesseurService,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    this.role = localStorage.getItem('role');
    this.id = localStorage.getItem('user_id');
  }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.paiement_services
      .getPaiementsByProfesserId(this.id, { notification: 'yes' })
      .subscribe({
        next: (res) => {
          this.paiements = res.paiements;
          console.warn(this.paiements.length);
          if (res.paiements.length >= 1) {
            this.isVide = false;
          } else {
            this.isVide = true;
          }
        },
        error: (err) => {},
      });
  }
  validation(event: any, id: string, data?: any) {
    this.paiement_services.validation(id, data).subscribe({
      next: (res: any) => {
        this.getData();
        this.toastr.success(`${res.message}`, `${res.status}`);
      },
      error: (err: any) => {
        this.toastr.error(`${err.error.message}`, `échec`);
      },
    });
  }
}
