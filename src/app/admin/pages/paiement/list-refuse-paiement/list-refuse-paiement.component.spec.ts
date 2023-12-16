import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRefusePaiementComponent } from './list-refuse-paiement.component';

describe('ListRefusePaiementComponent', () => {
  let component: ListRefusePaiementComponent;
  let fixture: ComponentFixture<ListRefusePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRefusePaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRefusePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
