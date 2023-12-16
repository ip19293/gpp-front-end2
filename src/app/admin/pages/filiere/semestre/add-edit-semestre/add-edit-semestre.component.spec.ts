import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSemestreComponent } from './add-edit-semestre.component';

describe('AddEditSemestreComponent', () => {
  let component: AddEditSemestreComponent;
  let fixture: ComponentFixture<AddEditSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSemestreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
