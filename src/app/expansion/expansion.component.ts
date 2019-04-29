import { Component, OnInit } from '@angular/core';

import { Food } from '../food';
import { FOODS } from '../mock-foods';
import { FoodService } from '../food.service';
import { PlateFoodService } from '../plate-food.service';
import { templateSourceUrl } from '@angular/compiler';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.css']
})
export class ExpansionComponent implements OnInit {
  panelOpenState = false;
  plateFood: Food[] = this.plateFood; // create array of food
  config = { panels: this.plateFoodService.platelist };

  constructor(private foodService: FoodService, private plateFoodService: PlateFoodService) { }

  ngOnInit() {

  }

  /*config = {
    panels: [
      { name: 'Section 1', description: 'First section' },
      { name: 'Section 2', description: 'Second section' },
      { name: 'Section 3', description: 'Third section' },
      { name: 'Section 4', description: 'Fourth section'}
    ]
  };*/

  totalCalorie(): any {
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(this.plateFoodService.platelist.calories.reduce(reducer))*/
    let totalCalories = 0;
    for (const i of this.plateFoodService.platelist) {
        totalCalories += i.calories;
    }
    return totalCalories;
  }

  totalFatNum(): any {
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(this.plateFoodService.platelist.calories.reduce(reducer))*/
    let totalFat = 0;
    for (const i of this.plateFoodService.platelist) {
      totalFat += i.total_fat;
    }
    return totalFat;
  }

  totalProtein(): any {
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(this.plateFoodService.platelist.calories.reduce(reducer))*/
    let totalProtein = 0;
    for (const i of this.plateFoodService.platelist) {
        totalProtein += i.protein;
    }
    return totalProtein;
  }

  totalCarbs(): any {
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(this.plateFoodService.platelist.calories.reduce(reducer))*/
    let totalCarbs = 0;
    for (const i of this.plateFoodService.platelist) {
        totalCarbs += i.carbohydrates;
    }
    return totalCarbs;
  }

  removeFromPlate(value: number) {
    // delete this.plateFoodService.platelist[value]
    // delete this.config.panels[value];
    // const index = myArray.indexOf(key, 0);

    this.plateFoodService.platelist.splice(value, 1);

    // console.log(value);
    // console.log('yo');
    this.config = {
      panels: this.plateFoodService.platelist
    };
  }

  removeWholePlate() {
    this.plateFoodService.platelist = [];
    this.config = {
      panels: this.plateFoodService.platelist
    };
  }
}
