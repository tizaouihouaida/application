import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedListComponent } from './suspended-list.component';

describe('SuspendedListComponent', () => {
  let component: SuspendedListComponent;
  let fixture: ComponentFixture<SuspendedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
