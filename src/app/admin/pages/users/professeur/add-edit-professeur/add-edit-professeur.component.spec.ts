import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProfesseurComponent } from './add-edit-professeur.component';

describe('AddEditProfesseurComponent', () => {
  let component: AddEditProfesseurComponent;
  let fixture: ComponentFixture<AddEditProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProfesseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
