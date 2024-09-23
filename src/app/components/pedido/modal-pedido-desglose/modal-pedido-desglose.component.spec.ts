import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPedidoDesgloseComponent } from './modal-pedido-desglose.component';

describe('ModalPedidoDesgloseComponent', () => {
  let component: ModalPedidoDesgloseComponent;
  let fixture: ComponentFixture<ModalPedidoDesgloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPedidoDesgloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPedidoDesgloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
