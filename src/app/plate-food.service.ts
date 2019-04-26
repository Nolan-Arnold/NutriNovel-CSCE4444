import { Injectable } from '@angular/core';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})
export class PlateFoodService {
  platelist: Food[] = [];
  comparelist: Food[] = [
      {
          _id: '', restname: 'Fast Food A', item: 'Add First Food Item to Compare',
          calories: 300, carbohydrates: 15, protein: 2, total_fat: 4, type: 'Breakfast'
      },
      {
          _id: '', restname: 'Fast Food B', item: 'Add Second Food Item to Compare',
          calories: 1080, carbohydrates: 13, protein: 8, total_fat: 6, type: 'Burger'
      }
  ];
  constructor() { }
}
