import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUsuarioDialogComponent } from './agregar-usuario-dialog.component';

describe('AgregarUsuarioDialogComponent', () => {
  let component: AgregarUsuarioDialogComponent;
  let fixture: ComponentFixture<AgregarUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarUsuarioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
