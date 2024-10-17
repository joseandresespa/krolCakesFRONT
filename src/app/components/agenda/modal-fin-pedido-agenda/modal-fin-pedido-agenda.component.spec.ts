import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFinPedidoAgendaComponent } from './modal-fin-pedido-agenda.component';

describe('ModalFinPedidoAgendaComponent', () => {
  let component: ModalFinPedidoAgendaComponent;
  let fixture: ComponentFixture<ModalFinPedidoAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFinPedidoAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFinPedidoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
