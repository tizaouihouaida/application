import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenssionListComponent } from './suspenssion-list.component';

describe('SuspenssionListComponent', () => {
  let component: SuspenssionListComponent;
  let fixture: ComponentFixture<SuspenssionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenssionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenssionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
