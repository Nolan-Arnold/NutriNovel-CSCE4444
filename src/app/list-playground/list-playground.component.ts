import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

export interface MenuElements {
 restname: string;
 item: string;
 calories: number;
 type: string;
}

const ELEMENT_DATA: MenuElements[] = [
 {restname: 'McDonald\'s', item: 'Egg McMuffin®', calories: 300, type: 'Breakfast'},
 {restname: 'Whataburger', item: 'Sweet & Spicy Bacon Burger', calories: 1080, type: 'Burger'},
 {restname: 'Whataburger', item: 'Cinnamon Roll', calories: 570, type: 'Dessert'},
 {restname: 'McDonald\'s', item: 'French Fries', calories: 340, type: 'Side'},
 {restname: 'Chick-fil-A', item: 'Waffle Fries', calories: 280, type: 'Side'},
 {restname: 'Burger King', item: 'BK Chicken Fries', calories: 290, type: 'Fries'},
 {restname: 'Five Guys'  , item: 'Burger Bowl', calories: 220, type: 'Burger'},
 {restname: 'Whataburger', item: 'WHATABURGER JR.®', calories: 400, type: 'Burger'},
 {restname: 'Chick-fil-A', item: 'Spicy Southwest Salad', calories: 350, type: 'Salad'},
 {restname: 'McDonald\'s', item: 'Happy Meal®', calories: 501, type: 'Meal'},
 {restname: 'McDonald\'s', item: 'Egg McMuffin®', calories: 300, type: 'Breakfast'},
 {restname: 'Whataburger', item: 'Sweet & Spicy Bacon Burger', calories: 1080, type: 'Burger'},
 {restname: 'Whataburger', item: 'Cinnamon Roll', calories: 570, type: 'Dessert'},
 {restname: 'McDonald\'s', item: 'French Fries', calories: 340, type: 'Side'},
 {restname: 'Chick-fil-A', item: 'Waffle Fries', calories: 280, type: 'Side'},
 {restname: 'Burger King', item: 'BK Chicken Fries', calories: 290, type: 'Fries'},
 {restname: 'Five Guys'  , item: 'Burger Bowl', calories: 220, type: 'Burger'},
 {restname: 'Whataburger', item: 'WHATABURGER JR.®', calories: 400, type: 'Burger'},
 {restname: 'Chick-fil-A', item: 'Spicy Southwest Salad', calories: 350, type: 'Salad'},
 {restname: 'McDonald\'s', item: 'Happy Meal®', calories: 501, type: 'Meal'},
 {restname: 'McDonald\'s', item: 'Happy Deal®', calories: 9001, type: 'Meal'},
];

@Component({
 selector: 'app-list-playground',
 templateUrl: './list-playground.component.html',
 styleUrls: ['./list-playground.component.css']
})

export class ListPlaygroundComponent implements OnInit {
 displayedColumns: string[] = ['select','restname', 'item', 'calories', 'type'];
 dataSource = new MatTableDataSource<MenuElements>(ELEMENT_DATA);
 selection = new SelectionModel<MenuElements>(true, []);
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

 /** Sorting related */
 ngOnInit() {
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
  }

   /** Filter related */
 applyFilter(filterValue: string) { //filter related things
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

