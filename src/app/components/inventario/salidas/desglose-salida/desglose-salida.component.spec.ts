import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesgloseSalidaComponent } from './desglose-salida.component';

describe('DesgloseSalidaComponent', () => {
  let component: DesgloseSalidaComponent;
  let fixture: ComponentFixture<DesgloseSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesgloseSalidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesgloseSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
