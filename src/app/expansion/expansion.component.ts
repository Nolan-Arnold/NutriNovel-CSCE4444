import { Component, OnInit } from '@angular/core';

import { Food } from '../food';
import { FOODS } from '../mock-foods';
import { FoodService } from '../food.service';
import { SearchComponent} from '../search/search.component';
import { PlateFood } from '../plate-food';
import { PlateFoodService } from '../plate-food.service';
import { templateSourceUrl } from '@angular/compiler';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.css']
})
export class ExpansionComponent implements OnInit {
  panelOpenState = false;
  constructor(private foodService: FoodService, private plateFoodService: PlateFoodService) { }

  ngOnInit() {

  }
  
  plateFood: Food[] = this.plateFood;//create array of food
  
  /*config = {
    panels: [
      { name: 'Section 1', description: 'First section' },
      { name: 'Section 2', description: 'Second section' },
      { name: 'Section 3', description: 'Third section' },
      { name: 'Section 4', description: 'Fourth section'}
    ]
  };*/
  config = {
    panels: this.plateFoodService.platelist
  };
  totalCalorie(): any{
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(this.plateFoodService.platelist.calories.reduce(reducer))*/
    var totalCalories = 0;
    for (let i of this.plateFoodService.platelist)
    {
        totalCalories += i.calories;
    }
    return totalCalories;
  }
  totalFatNum(): any{
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(this.plateFoodService.platelist.calories.reduce(reducer))*/
    var total_Fat = 0;
    for (let i of this.plateFoodService.platelist)
    {
        total_Fat += i.totalFat;
    }
    return total_Fat;
  }
  totalProtein(): any{
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(this.plateFoodService.platelist.calories.reduce(reducer))*/
    var totalProtein = 0;
    for (let i of this.plateFoodService.platelist)
    {
        totalProtein += i.protein;
    }
    return totalProtein;
  }
  totalCarbs(): any{
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(this.plateFoodService.platelist.calories.reduce(reducer))*/
    var total_carbs = 0;
    for (let i of this.plateFoodService.platelist)
    {
        total_carbs += i.carbs;
    }
    return total_carbs;
  }
  removeFromPlate(value){
    //delete this.plateFoodService.platelist[value]
    //delete this.config.panels[value];
    //const index = myArray.indexOf(key, 0);
    
   this.plateFoodService.platelist.splice(value, 1);

    console.log(value);
    console.log('yo');
    this.config = {
      panels: this.plateFoodService.platelist
    }
  }
}

