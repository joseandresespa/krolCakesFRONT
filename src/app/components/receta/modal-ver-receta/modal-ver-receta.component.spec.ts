import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerRecetaComponent } from './modal-ver-receta.component';

describe('ModalVerRecetaComponent', () => {
  let component: ModalVerRecetaComponent;
  let fixture: ComponentFixture<ModalVerRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVerRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
