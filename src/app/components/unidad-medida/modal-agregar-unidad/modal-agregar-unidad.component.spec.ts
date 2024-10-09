import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarUnidadComponent } from './modal-agregar-unidad.component';

describe('ModalAgregarUnidadComponent', () => {
  let component: ModalAgregarUnidadComponent;
  let fixture: ComponentFixture<ModalAgregarUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarUnidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
