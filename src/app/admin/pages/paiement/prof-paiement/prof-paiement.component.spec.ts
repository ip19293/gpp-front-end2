import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfPaiementComponent } from './prof-paiement.component';

describe('ProfPaiementComponent', () => {
  let component: ProfPaiementComponent;
  let fixture: ComponentFixture<ProfPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfPaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
