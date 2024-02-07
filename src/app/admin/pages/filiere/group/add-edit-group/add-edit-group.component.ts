import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GroupsService } from 'src/app/admin/services/groups.service';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.css'],
})
export class AddEditGroupComponent implements OnInit {
  groupForm!: FormGroup;
  id: any;
  semestres: any;
  filliere: any;
  semestre: any;
  niveau: any;
  data2: any;
  constructor(
    private builder: FormBuilder,
    private _dialog: MatDialogRef<AddEditGroupComponent>,
    private service_group: GroupsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm = this.builder.group({
      numero: ['', Validators.required],
      type: ['', Validators.required],
      semestre: ['', Validators.required],
    });
    this.id = localStorage.getItem('filliere');
  }
  onFormSubmit() {
    if (this.groupForm.valid) {
      if (this.data) {
        this.service_group
          .updateGroup(this.data._id, this.groupForm.value)
          .subscribe({
            next: (val) => {
              this.toastr.success(`${val.message} `, `${val.status} `);
              this._dialog.close(true);
            },
            error: (err: any) => {
              console.warn(err.error.error.code);
              this.toastr.error(`${err.error.message}`, `${err.error.status} `);
            },
          });
      } else {
        this.service_group.addGroup(this.groupForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`${val.message}`, `${val.status} `);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status} `);
          },
        });
      }
    }
  }
  ngOnInit(): void {
    console.warn(this.data);
    this.groupForm.patchValue(this.data);
    this.getSemestres();
  }

  getSemestres() {
    this.service_group
      .getAllGroupsByFilliereId(this.id)
      .subscribe((res: any) => {
        this.semestres = res.semestre_names;
        this.filliere = res.filliere;
        this.semestre = res.semestre;
        this.niveau = res.niveau;
        // console.log(res);
      });
  }
}
