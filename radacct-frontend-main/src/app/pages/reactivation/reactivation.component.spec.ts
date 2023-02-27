import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivationComponent } from './reactivation.component';

describe('ReactivationComponent', () => {
  let component: ReactivationComponent;
  let fixture: ComponentFixture<ReactivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
