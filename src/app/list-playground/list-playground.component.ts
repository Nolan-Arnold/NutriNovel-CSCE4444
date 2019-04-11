import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

import { Food } from '../food';
import { FOODS } from '../mock-foods';
import { FoodService } from '../food.service';

// Removed hardcoded decloration of MenuElements object
// Removed hardcoded decloration of ELEMENT_DATA array of MenuElements objects
// Renamed MenuElements to Food, which is now defined in food.ts
// Renamed ELEMENT_DATA to FOODS, which is an array of food objects

@Component({
  selector: 'app-list-playground',
  templateUrl: './list-playground.component.html',
  styleUrls: ['./list-playground.component.css']
})

export class ListPlaygroundComponent implements OnInit {

  // Create FOODS, an array of food objects
  // TODO: Currently stores a local array of food objects, must change to using observables
  FOODS: Food[] = FOODS;
  displayedColumns: string[] = ['select', 'restname', 'item', 'calories', 'carbs', 'protein', 'total fat', 'type'];
  /** TODO: MatTableDataSource will not work with the observables being returned
   *  need to convert to a model using Custom Angular CDK Data Source.
   *  see https://blog.angular-university.io/angular-material-data-table/
   *  for walkthrough. Lupe Rivera
   */
  dataSource = new MatTableDataSource<Food>(this.FOODS);
  selection = new SelectionModel<Food>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private foodService: FoodService) { }

  /** Sorting related */
  ngOnInit() {
    // this.getFoods(); // Does not work, see note above dataSource
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Calls the sever to retrieve all foods */
  getFoods(): void {
    this.foodService.getFoods().subscribe(foods => this.FOODS = foods);
  }

  /** Filter related things */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
}

