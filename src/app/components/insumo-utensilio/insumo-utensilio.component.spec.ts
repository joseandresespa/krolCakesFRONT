import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoUtensilioComponent } from './insumo-utensilio.component';

describe('InsumoUtensilioComponent', () => {
  let component: InsumoUtensilioComponent;
  let fixture: ComponentFixture<InsumoUtensilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumoUtensilioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoUtensilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
