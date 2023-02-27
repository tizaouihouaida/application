import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenssionComponent } from './suspenssion.component';

describe('SuspenssionComponent', () => {
  let component: SuspenssionComponent;
  let fixture: ComponentFixture<SuspenssionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenssionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenssionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
