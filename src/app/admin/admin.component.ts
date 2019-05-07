import { Component, OnInit } from '@angular/core';
import { InputfoodService } from '../inputfood.service';
import { FoodService } from '../food.service';
import { Food } from '../food';
import { PlateFoodService } from '../plate-food.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: InputfoodService, private foodService: FoodService, private plateFoodService: PlateFoodService) { }

  ngOnInit() {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    // this.newFood._id = this.newFood.restname + ' ' + this.newFood.item;
    this.foodService.addFood(this.service.form.value).subscribe(res => {
      if (res._id !== '') {
        alert('SUCCESS!');
      } else {
        alert('Oops. An Unknown Error Has Occured.');
      }
    });
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
}
