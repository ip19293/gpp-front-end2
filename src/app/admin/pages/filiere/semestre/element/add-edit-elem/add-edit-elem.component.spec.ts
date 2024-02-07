import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditElemComponent } from './add-edit-elem.component';

describe('AddEditElemComponent', () => {
  let component: AddEditElemComponent;
  let fixture: ComponentFixture<AddEditElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditElemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
