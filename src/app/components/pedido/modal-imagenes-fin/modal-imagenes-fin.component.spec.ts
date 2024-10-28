import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImagenesFinComponent } from './modal-imagenes-fin.component';

describe('ModalImagenesFinComponent', () => {
  let component: ModalImagenesFinComponent;
  let fixture: ComponentFixture<ModalImagenesFinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImagenesFinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImagenesFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
