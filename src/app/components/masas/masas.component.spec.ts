import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasasComponent } from './masas.component';

describe('MasasComponent', () => {
  let component: MasasComponent;
  let fixture: ComponentFixture<MasasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
