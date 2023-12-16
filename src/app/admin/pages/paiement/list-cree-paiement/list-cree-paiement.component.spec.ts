import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreePaiementComponent } from './list-cree-paiement.component';

describe('ListCreePaiementComponent', () => {
  let component: ListCreePaiementComponent;
  let fixture: ComponentFixture<ListCreePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCreePaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCreePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
