import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesTickerComponent } from './favourites-ticker.component';

describe('FavouritesTickerComponent', () => {
  let component: FavouritesTickerComponent;
  let fixture: ComponentFixture<FavouritesTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesTickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouritesTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
