import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfMatiereComponent } from './prof-matiere.component';

describe('ProfMatiereComponent', () => {
  let component: ProfMatiereComponent;
  let fixture: ComponentFixture<ProfMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfMatiereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
