import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarAccesoComponent } from './modal-agregar-acceso.component';

describe('ModalAgregarAccesoComponent', () => {
  let component: ModalAgregarAccesoComponent;
  let fixture: ComponentFixture<ModalAgregarAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarAccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
