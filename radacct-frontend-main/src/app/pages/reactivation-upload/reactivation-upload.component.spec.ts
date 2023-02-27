import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivationUploadComponent } from './reactivation-upload.component';

describe('ReactivationUploadComponent', () => {
  let component: ReactivationUploadComponent;
  let fixture: ComponentFixture<ReactivationUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivationUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
