import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAccesoComponent } from './modal-editar-acceso.component';

describe('ModalEditarAccesoComponent', () => {
  let component: ModalEditarAccesoComponent;
  let fixture: ComponentFixture<ModalEditarAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarAccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
