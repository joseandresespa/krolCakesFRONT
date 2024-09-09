import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoSalidaComponent } from './motivo-salida.component';

describe('MotivoSalidaComponent', () => {
  let component: MotivoSalidaComponent;
  let fixture: ComponentFixture<MotivoSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivoSalidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
