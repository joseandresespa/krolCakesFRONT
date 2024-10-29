import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelesRealizadosComponent } from './pasteles-realizados.component';

describe('PastelesRealizadosComponent', () => {
  let component: PastelesRealizadosComponent;
  let fixture: ComponentFixture<PastelesRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastelesRealizadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelesRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
