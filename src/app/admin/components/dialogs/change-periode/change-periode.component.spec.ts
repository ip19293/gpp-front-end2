import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePeriodeComponent } from './change-periode.component';

describe('ChangePeriodeComponent', () => {
  let component: ChangePeriodeComponent;
  let fixture: ComponentFixture<ChangePeriodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePeriodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
