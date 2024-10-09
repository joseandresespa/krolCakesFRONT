import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelRealizadoComponent } from './pastel-realizado.component';

describe('PastelRealizadoComponent', () => {
  let component: PastelRealizadoComponent;
  let fixture: ComponentFixture<PastelRealizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastelRealizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
