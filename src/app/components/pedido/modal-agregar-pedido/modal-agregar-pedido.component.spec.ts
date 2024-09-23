import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarPedidoComponent } from './modal-agregar-pedido.component';

describe('ModalAgregarPedidoComponent', () => {
  let component: ModalAgregarPedidoComponent;
  let fixture: ComponentFixture<ModalAgregarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
