import { Component, OnInit } from '@angular/core';
import { PlateFoodService } from '../plate-food.service';
import { FoodService } from '../food.service';
import { Food } from '../food';

export interface Tile {

  cols: number;
  rows: number;
  text: string;
  background: string;
}
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  constructor(private foodService: FoodService, private plateFoodService: PlateFoodService) { }
 /* tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];*/
  compareItems: Food[] = this.plateFoodService.comparelist;

  tiles: Tile[] = [
    { text: this.compareItems[0].item, cols: 2, rows: 1, background: 'lightgray' },
    {text: this.compareItems[1].item, cols: 2, rows: 1, background: 'lightgray'},
    {text: String(this.compareItems[0].calories + ' Calories'), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compareItems[1].calories + ' Calories'), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compareItems[0].total_fat + ' Total Fat (g)'), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compareItems[1].total_fat + ' Total Fat (g)'), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compareItems[0].carbohydrates + ' Carbohydrates (g)'), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compareItems[1].carbohydrates + ' Carbohydrates (g)'), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compareItems[0].protein + ' Protein (g)'), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compareItems[1].protein + ' Protein (g)'), cols: 2, rows: 1, background: 'white'},
    ];

  ngOnInit() {

  }

  showCalories(i: number): number {
    return this.compareItems[i].calories;
  }
  showFat(i: number): number {
    return this.compareItems[i].total_fat;
  }
  showCarbs(i: number): number {
    return this.compareItems[i].carbohydrates;
  }
  showProtein(i: number): number {
    return this.compareItems[i].protein;
  }
  showItem(i: number): string {
    return this.compareItems[i].item;
  }
}
