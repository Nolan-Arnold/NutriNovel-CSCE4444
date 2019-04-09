import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPlaygroundComponent } from './list-playground.component';

describe('ListPlaygroundComponent', () => {
  let component: ListPlaygroundComponent;
  let fixture: ComponentFixture<ListPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlaygroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
