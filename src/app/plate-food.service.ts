import { Injectable } from '@angular/core';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})
export class PlateFoodService {
  platelist: Food[] = [];
  comparelist: Food[] = [
      {
          _id: '', restname: 'Fast Food A', item: 'Add 2 Food Items to Compare',
          calories: 0, carbohydrates: 0, protein: 0, total_fat: 0, type: 'NA'
      },
      {
          _id: '', restname: 'Fast Food B', item: 'Add 2 Food Items to Compare',
          calories: 0, carbohydrates: 0, protein: 0, total_fat: 0, type: 'NA'
      }
  ];
  constructor() { }
}
