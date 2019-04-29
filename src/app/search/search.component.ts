import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

import { FoodService } from '../food.service';
import { FoodDataSource } from '../food-data-source';
import { Food } from '../food';
import { PlateFoodService } from '../plate-food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'restname', 'item', 'calories', 'carbohydrates', 'protein', 'total fat', 'type'];
  /** TODO: Initial table load does not show the total number of pages, it
   *  updates after user interacts with the table.
   *
   *  COMPLETED: MatTableDataSource will not work with the observables being returned
   *  need to convert to a model using Custom Angular CDK Data Source.
   *  see https://blog.angular-university.io/angular-material-data-table/
   *  for walkthrough. Lupe Rivera
   *
   *  Completed - Lupe Rivera
   */

  compareDisabled = true; // used to turn the compare button on or off
  dataSource: FoodDataSource; // retrieves and stores data that the table displays
  elementCount: number; // stores the total number of elements matching the filtered query
  selection = new SelectionModel<Food>(true, []); // tracks what elements the users has selected
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(private foodService: FoodService, private plateFoodService: PlateFoodService) { }

  ngOnInit() {
    this.dataSource = new FoodDataSource(this.foodService);
    this.getPageCount(); // ensure page count is updated for first page load
    this.dataSource.loadFoods('', 'restname', 'asc', 0, 15); // intialize the table with data from backend
    this.selection.isSelected = this.isChecked.bind(this); // Overwrites built in method with new local method
    this.selection.toggle = this.myToggle.bind(this); // Overwrites built in method with new local method
  }

  ngAfterViewInit() {

    // server-side search on user search entry
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
      this.getPageCount();
  }

  // updates the total number of elements
  getPageCount() {
    this.dataSource.elementCount$.subscribe(count => this.elementCount = count);
  }

  // override the isSelected method so it checks based on the objects internal _id
  isChecked(row: Food): boolean {
    const found = this.selection.selected.find(food => food._id === row._id);
    if ( found !== undefined ) {
      this.activateCompare(1);
      return true;
    }
    this.activateCompare(0);
    return false;
  }

  // override the toggle() method so it toggles based on the objects interal _id
  myToggle(value: Food): void {
    if ( this.isChecked(value) ) {
      const found = this.selection.selected.find(food => food._id === value._id);
      this.selection.deselect(found);
    } else {
      this.selection.select(value);
    }
  }

  // Toggles the compare button on and off based on if the user has exactly 2 food items selected.
  activateCompare(num: number): void {
    if (this.selection.selected.length + num === 2) {
      this.compareDisabled = false;
    } else {
      this.compareDisabled = true;
    }
  }

  // this method will load the currently select food objects into the array platelist
  // access platelist from the plateFoodService to get the users slections
  loadPlate( event: any ): void {
    this.plateFoodService.platelist = this.plateFoodService.platelist.concat(this.selection.selected);
  }

  // this method will load the currently select food objects into the array comparelist
  // access comparelist from the plateFoodService to get the users slections
  loadCompare( event: any ): void {
    if ( this.selection.selected.length === 2 ) {
      this.plateFoodService.comparelist = this.selection.selected;
    } else
    if ( this.selection.selected.length === 1 ) {
      const temp = this.plateFoodService.comparelist.pop();
      this.plateFoodService.comparelist = this.selection.selected;
      this.plateFoodService.comparelist.push(temp);
    }
    // TODO Need handle cases where the user selects 3 or more items to compare
  }
}
