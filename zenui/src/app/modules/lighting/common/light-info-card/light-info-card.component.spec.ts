import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightInfoCardComponent } from './light-info-card.component';

describe('LightInfoCardComponent', () => {
  let component: LightInfoCardComponent;
  let fixture: ComponentFixture<LightInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
