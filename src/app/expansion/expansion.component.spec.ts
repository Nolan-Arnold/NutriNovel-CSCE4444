import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionComponent } from './expansion.component';

describe('ExpansionComponent', () => {
  let component: ExpansionComponent;
  let fixture: ComponentFixture<ExpansionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create initial totalCalorie', () => {
    component.totalCalorie();
    expect(component).toBe(0);
  });
  it('should create inital totalFatNum', () => {
    component.totalFatNum();
    expect(component).toBe(0);
  });
  it('should create initial totalProtein', () => {
    component.totalProtein();
    expect(component).toBe(0);
  });
  it('should create initial totalCarbs', () => {
    component.totalCarbs();
    expect(component).toBe(0);
  });
  it('should create removeFromPlate', () => {
    component.removeFromPlate(1);
    expect(component).toBe(this);
  });
  it('should create removeWholePlate', () => {
    component.removeWholePlate();
    expect(component).toBe([]);
  });
});
