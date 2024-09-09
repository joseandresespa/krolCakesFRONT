import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInsumoUtencilioComponent } from './tipo-insumo-utencilio.component';

describe('TipoInsumoUtencilioComponent', () => {
  let component: TipoInsumoUtencilioComponent;
  let fixture: ComponentFixture<TipoInsumoUtencilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoInsumoUtencilioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoInsumoUtencilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
