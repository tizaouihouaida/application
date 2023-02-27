import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenssionUploadComponent } from './suspenssion-upload.component';

describe('SuspenssionComponent', () => {
  let component: SuspenssionUploadComponent;
  let fixture: ComponentFixture<SuspenssionUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenssionUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenssionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
