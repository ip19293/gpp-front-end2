import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTerminePaiementComponent } from './list-termine-paiement.component';

describe('ListTerminePaiementComponent', () => {
  let component: ListTerminePaiementComponent;
  let fixture: ComponentFixture<ListTerminePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTerminePaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTerminePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
