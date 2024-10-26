import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSalidaComponent } from './agregar-salida.component';

describe('AgregarSalidaComponent', () => {
  let component: AgregarSalidaComponent;
  let fixture: ComponentFixture<AgregarSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSalidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
