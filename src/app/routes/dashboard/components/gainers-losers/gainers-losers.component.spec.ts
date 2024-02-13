import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GainersLosersComponent } from './gainers-losers.component';

describe('GainersLosersComponent', () => {
  let component: GainersLosersComponent;
  let fixture: ComponentFixture<GainersLosersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GainersLosersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GainersLosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
