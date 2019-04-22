import { Injectable } from '@angular/core';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})
export class PlateFoodService {
  platelist: Food[] = []
  comparelist: Food[] = []
  constructor() { }
}
