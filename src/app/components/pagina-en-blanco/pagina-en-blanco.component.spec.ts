import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEnBlancoComponent } from './pagina-en-blanco.component';

describe('PaginaEnBlancoComponent', () => {
  let component: PaginaEnBlancoComponent;
  let fixture: ComponentFixture<PaginaEnBlancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaEnBlancoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaEnBlancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
