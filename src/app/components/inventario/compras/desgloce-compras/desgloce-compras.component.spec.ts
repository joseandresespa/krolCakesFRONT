import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesgloceComprasComponent } from './desgloce-compras.component';

describe('DesgloceComprasComponent', () => {
  let component: DesgloceComprasComponent;
  let fixture: ComponentFixture<DesgloceComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesgloceComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesgloceComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
