import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

import { FoodService } from '../food.service';
import { FoodDataSource } from '../food-data-source';
import { Food } from '../food';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'restname', 'item', 'calories', 'carbs', 'protein', 'total fat', 'type'];
  /** TODO: MatTableDataSource will not work with the observables being returned
   *  need to convert to a model using Custom Angular CDK Data Source.
   *  see https://blog.angular-university.io/angular-material-data-table/
   *  for walkthrough. Lupe Rivera
   */
  dataSource: FoodDataSource;
  elementCount: number;
  public plateFood: Food[]; // stores food object for plate to access, public so plate component can access
  selection = new SelectionModel<Food>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.dataSource = new FoodDataSource(this.foodService);
    this.dataSource.loadFoods('', 'restname', 'asc', 0, 10); // intialize the table with data from backend
    this.selection.isSelected = this.isChecked.bind(this); // idk
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
              this.paginator.pageIndex = 0;
              this.loadFoodsPage();
          })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          tap(() => this.loadFoodsPage())
      )
      .subscribe();
  }

  // updates the view based on user input (sort, paging, and searches)
  loadFoodsPage() {
      this.dataSource.loadFoods(
          this.input.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
      this.getPageCount(this.input.nativeElement.value);
  }

  // updates the total number of elements
  getPageCount(filter: string) {
    this.dataSource.elementCount$.subscribe(count => this.elementCount = count);
  }

  // override the isSelected method so it checks based on the objects internal _id
  isChecked(row: any): boolean {
    const found = this.selection.selected.find(food => food._id === row._id);
    if (found) {
      return true;
    }
    return false;
  }

  // this method will load the currently select food objects into the local array plateFood
  // access plateFood from the plate component to get the users slections
  loadPlate() {
    this.plateFood = [];
    this.plateFood = this.selection.selected;
  }
}
