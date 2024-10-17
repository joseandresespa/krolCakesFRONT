import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarInsumoComponent } from './modal-editar-insumo.component';

describe('ModalEditarInsumoComponent', () => {
  let component: ModalEditarInsumoComponent;
  let fixture: ComponentFixture<ModalEditarInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarInsumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
