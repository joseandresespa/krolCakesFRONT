import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarSeguridadComponent } from './modal-editar-seguridad.component';

describe('ModalEditarSeguridadComponent', () => {
  let component: ModalEditarSeguridadComponent;
  let fixture: ComponentFixture<ModalEditarSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarSeguridadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
