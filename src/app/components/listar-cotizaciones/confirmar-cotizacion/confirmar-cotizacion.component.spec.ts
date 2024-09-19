import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCotizacionComponent } from './confirmar-cotizacion.component';

describe('ConfirmarCotizacionComponent', () => {
  let component: ConfirmarCotizacionComponent;
  let fixture: ComponentFixture<ConfirmarCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
