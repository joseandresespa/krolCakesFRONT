import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDesgloceCostoComponent } from './modal-desgloce-costo.component';

describe('ModalDesgloceCostoComponent', () => {
  let component: ModalDesgloceCostoComponent;
  let fixture: ComponentFixture<ModalDesgloceCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDesgloceCostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDesgloceCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
