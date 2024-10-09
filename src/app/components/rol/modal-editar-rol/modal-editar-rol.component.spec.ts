import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarRolComponent } from './modal-editar-rol.component';

describe('ModalEditarRolComponent', () => {
  let component: ModalEditarRolComponent;
  let fixture: ComponentFixture<ModalEditarRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
