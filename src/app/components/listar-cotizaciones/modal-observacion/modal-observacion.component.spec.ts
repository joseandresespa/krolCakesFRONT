import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObservacionComponent } from './modal-observacion.component';

describe('ModalObservacionComponent', () => {
  let component: ModalObservacionComponent;
  let fixture: ComponentFixture<ModalObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalObservacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
