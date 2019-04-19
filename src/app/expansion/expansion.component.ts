import { Component, OnInit } from '@angular/core';

import { Food } from '../food';
import { FOODS } from '../mock-foods';
import { FoodService } from '../food.service';
import { SearchComponent} from '../search/search.component';
import { PlateFood } from '../plate-food';
import { PlateFoodService } from '../plate-food.service';

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
  

}

