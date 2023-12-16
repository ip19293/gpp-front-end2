import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMatiereComponent } from './add-edit-matiere.component';

describe('AddEditMatiereComponent', () => {
  let component: AddEditMatiereComponent;
  let fixture: ComponentFixture<AddEditMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMatiereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
