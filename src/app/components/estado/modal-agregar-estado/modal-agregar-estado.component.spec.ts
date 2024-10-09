import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarEstadoComponent } from './modal-agregar-estado.component';

describe('ModalAgregarEstadoComponent', () => {
  let component: ModalAgregarEstadoComponent;
  let fixture: ComponentFixture<ModalAgregarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarEstadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
