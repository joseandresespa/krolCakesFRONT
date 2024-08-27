import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsComponent } from './qs.component';

describe('QsComponent', () => {
  let component: QsComponent;
  let fixture: ComponentFixture<QsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
