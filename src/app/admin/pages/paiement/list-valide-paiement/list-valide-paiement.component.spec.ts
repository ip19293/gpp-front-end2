import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListValidePaiementComponent } from './list-valide-paiement.component';

describe('ListValidePaiementComponent', () => {
  let component: ListValidePaiementComponent;
  let fixture: ComponentFixture<ListValidePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListValidePaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListValidePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
