import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomchatComponent } from './zoomchat.component';

describe('ZoomchatComponent', () => {
  let component: ZoomchatComponent;
  let fixture: ComponentFixture<ZoomchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
