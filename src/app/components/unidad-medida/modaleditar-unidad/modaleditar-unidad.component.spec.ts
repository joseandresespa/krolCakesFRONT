import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditarUnidadComponent } from './modaleditar-unidad.component';

describe('ModaleditarUnidadComponent', () => {
  let component: ModaleditarUnidadComponent;
  let fixture: ComponentFixture<ModaleditarUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleditarUnidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleditarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
