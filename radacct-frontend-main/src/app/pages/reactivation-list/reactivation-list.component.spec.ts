import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivationListComponent } from './reactivation-list.component';

describe('ReactivationListComponent', () => {
  let component: ReactivationListComponent;
  let fixture: ComponentFixture<ReactivationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
