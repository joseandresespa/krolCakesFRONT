import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpsComponent } from './umps.component';

describe('UmpsComponent', () => {
  let component: UmpsComponent;
  let fixture: ComponentFixture<UmpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UmpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
