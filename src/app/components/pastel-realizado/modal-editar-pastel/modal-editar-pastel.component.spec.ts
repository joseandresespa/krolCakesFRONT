import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarPastelComponent } from './modal-editar-pastel.component';

describe('ModalEditarPastelComponent', () => {
  let component: ModalEditarPastelComponent;
  let fixture: ComponentFixture<ModalEditarPastelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarPastelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarPastelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
