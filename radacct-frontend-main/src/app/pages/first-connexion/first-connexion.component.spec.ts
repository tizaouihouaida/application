import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConnexionComponent } from './first-connexion.component';

describe('FirstConnexionComponent', () => {
  let component: FirstConnexionComponent;
  let fixture: ComponentFixture<FirstConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstConnexionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
