// import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent, Observable } from 'rxjs';

import { PageCount } from '../page-count';
import { FoodService } from '../food.service';
import { FoodDataSource } from '../food-data-source';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['restname', 'item', 'calories', 'carbs', 'protein', 'total fat', 'type'];
  /** TODO: MatTableDataSource will not work with the observables being returned
   *  need to convert to a model using Custom Angular CDK Data Source.
   *  see https://blog.angular-university.io/angular-material-data-table/
   *  for walkthrough. Lupe Rivera
   */
  dataSource: FoodDataSource;
  elementCount: number;
  // selection = new SelectionModel<Food>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.dataSource = new FoodDataSource(this.foodService);
    this.dataSource.loadFoods('', 'asc', 0, 10);
    // this.getPageCount('');
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

  loadFoodsPage() {
      this.dataSource.loadFoods(
          this.input.nativeElement.value,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
  }
  /*
  getPageCount(filter: string) {
    this.foodService.getFoodsCount(filter).subscribe(count => this.pageCount = count);
  }
  */
}
