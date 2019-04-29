import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareComponent } from './compare.component';

describe('CompareComponent', () => {
  let component: CompareComponent;
  let i =  this.plateFoodService.comparelist;
  let fixture: ComponentFixture<CompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the item iteslf', () => {
    component.showItem(i);

    expect(component).toBeTruthy();
  });
  it('should display the caloire for each item', () => {
    component.showCalories(i);
    expect(component).toBeTruthy();
  });
  it('should display the carbs count for each item', () => {
    component.showCarbs(i);

    expect(component).toBeTruthy();
  });
  it('should display the protein count for each item', () => {
    component.showProtein(i);

    expect(component).toBeTruthy();
  });
  it('should create the fat count for each item', () => {
    component.showFat(i);

    expect(component).toBeTruthy();
  });
});