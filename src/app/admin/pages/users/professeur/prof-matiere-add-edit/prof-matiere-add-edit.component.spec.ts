import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfMatiereAddEditComponent } from './prof-matiere-add-edit.component';

describe('ProfMatiereAddEditComponent', () => {
  let component: ProfMatiereAddEditComponent;
  let fixture: ComponentFixture<ProfMatiereAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfMatiereAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfMatiereAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
