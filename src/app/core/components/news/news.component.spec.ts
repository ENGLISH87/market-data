import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsComponent } from './news.component';

xdescribe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch latest news on component load', () => {
    // TODO:
  });

  it('should get latest news for input provided ticker', () => {
    // TODO:
  });
});
