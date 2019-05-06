import { Component, OnInit } from '@angular/core';
import { InputfoodService } from '../inputfood.service';
import { FoodService } from '../food.service';
import { Food } from '../food';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: InputfoodService) { }

  ngOnInit() {
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
}
