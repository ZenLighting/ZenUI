import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInfoCardComponent } from './room-info-card.component';

describe('RoomInfoCardComponent', () => {
  let component: RoomInfoCardComponent;
  let fixture: ComponentFixture<RoomInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
