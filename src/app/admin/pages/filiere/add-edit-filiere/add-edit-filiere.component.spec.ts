import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFiliereComponent } from './add-edit-filiere.component';

describe('AddEditFiliereComponent', () => {
  let component: AddEditFiliereComponent;
  let fixture: ComponentFixture<AddEditFiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFiliereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
