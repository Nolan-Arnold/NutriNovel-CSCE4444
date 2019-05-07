import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Food } from './food';
import { FOODS } from './mock-foods';
import { MessageService } from './message.service';

// used for post, update, and delete
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // URL to web api
  private foodsUrl = 'http://localhost:8000/api/foods';

  blankFood: Food;

  /** Log a FoodService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  findFoods( filter = '', sortId = 'restname', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<Food[]> {
    const parameters = new HttpParams().set('filter', filter).set('sortId', sortId)
      .set('sortOrder', sortOrder).set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());
    return this.http.get<Food[]>(this.foodsUrl, { params: parameters })
      .pipe(
        catchError(this.handleError('findFoods', FOODS))
      );
  }

  getFoodsCount( filter = '' ): Observable<number> {
    const parameters = new HttpParams().set('filter', filter);
    const url = this.foodsUrl + '/count';
    return this.http.get<number>(url, { params: parameters })
      .pipe(
        catchError(this.handleError('getFoodsCount', 0))
      );
  }

  //////// Save methods //////////

  // POST: add a new food to the server
  addFood(food: Food): Observable<any> {
    // this.log(food.item);
    return this.http.post<any>(this.foodsUrl, food)
      .pipe(
        catchError(this.handleError<any>('addFood', ''))
      );
  }

  // DELETE: delete the food from the server
  deleteFood(food: Food): Observable<any> {
    // this.log(food._id);

    return this.http.delete<any>(this.foodsUrl + '/' + food._id).pipe(
      catchError(this.handleError<any>('deleteFood', ''))
    );
  }
  /*
  // PUT: update the food on the server
  updateFood(food: Food): Observable<Food> {
    return this.http.put<any>(this.foodsUrl, { body: food }, httpOptions).pipe(
      catchError(this.handleError<any>('updateFood', this.blankFood))
    );
  }
  */
}
