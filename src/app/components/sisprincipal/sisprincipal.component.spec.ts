import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SisprincipalComponent } from './sisprincipal.component';

describe('SisprincipalComponent', () => {
  let component: SisprincipalComponent;
  let fixture: ComponentFixture<SisprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SisprincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SisprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
