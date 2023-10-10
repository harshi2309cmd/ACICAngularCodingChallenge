import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularLinesOfBusinessComponent } from './popularLinesOfBusiness.component';

describe('PopularLinesOfBusinessComponent', () => {
  let component: PopularLinesOfBusinessComponent;
  let fixture: ComponentFixture<PopularLinesOfBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularLinesOfBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularLinesOfBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
