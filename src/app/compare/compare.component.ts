import { Component, OnInit } from '@angular/core';
import { PlateFoodService } from '../plate-food.service';
import { FoodService } from '../food.service';
import { Food } from '../Food'

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

  ngOnInit() {

  }
 /* tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];*/
  compare_items: Food[] = this.plateFoodService.comparelist;
  tiles: Tile[] = [
    {text: this.compare_items[0].item, cols: 2, rows: 1, background: 'lightgray'},
    {text: this.compare_items[1].item, cols: 2, rows: 1, background: 'lightgray'},
    {text: String(this.compare_items[0].calories + " Calories"), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compare_items[1].calories + " Calories"), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compare_items[0].total_fat + " Total Fat"), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compare_items[1].total_fat + " Total Fat"), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compare_items[0].carbs + " Carbs"), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compare_items[1].carbs + " Carbs"), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compare_items[0].protein + " Protein"), cols: 2, rows: 1, background: 'white'},
    {text: String(this.compare_items[1].protein + " Protein"), cols: 2, rows: 1, background: 'white'},
    ];
  showCalories(i): any{
    return this.compare_items[i].calories;
  }
  showFat(i): any{
    return this.compare_items[i].total_fat;
  }
  showCarbs(i): any{
    return this.compare_items[i].carbs;
  }
  showProtein(i): any{
    return this.compare_items[i].protein;
  }
  showItem(i): any{
    return this.compare_items[i].item;
  }
}
