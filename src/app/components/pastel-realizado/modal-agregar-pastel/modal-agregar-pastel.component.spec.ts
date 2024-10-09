import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarPastelComponent } from './modal-agregar-pastel.component';

describe('ModalAgregarPastelComponent', () => {
  let component: ModalAgregarPastelComponent;
  let fixture: ComponentFixture<ModalAgregarPastelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarPastelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarPastelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
