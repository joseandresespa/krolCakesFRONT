import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoMantenimientoComponent } from './acceso-mantenimiento.component';

describe('AccesoMantenimientoComponent', () => {
  let component: AccesoMantenimientoComponent;
  let fixture: ComponentFixture<AccesoMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesoMantenimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
