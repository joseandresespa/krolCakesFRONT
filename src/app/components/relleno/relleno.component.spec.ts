import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RellenoComponent } from './relleno.component';

describe('RellenoComponent', () => {
  let component: RellenoComponent;
  let fixture: ComponentFixture<RellenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RellenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RellenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
