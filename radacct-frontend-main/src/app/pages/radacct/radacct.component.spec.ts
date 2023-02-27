import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadacctComponent } from './radacct.component';

describe('TablesComponent', () => {
  let component: RadacctComponent;
  let fixture: ComponentFixture<RadacctComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RadacctComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadacctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
