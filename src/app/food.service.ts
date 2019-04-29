import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Food } from './food';
import { MessageService } from './message.service';

// used for post, update, and delete
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // URL to web api
  private foodsUrl = 'http://localhost:8000/api/foods';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

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
        catchError(this.handleError('findFoods', []))
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

  /*
  // Get all foods from the server
  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodsUrl)
      .pipe(
        catchError(this.handleError('getFoods', []))
      );
  }

  // GET foods whose name contains search term
  searchFoods(term: string): Observable<Food[]> {
    if (!term.trim()) {
      // if not search term, return empty food array.
      return of([]);
    }
    return this.http.get<Food[]>(`${this.foodsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found foods matching "${term}"`)),
      catchError(this.handleError<Food[]>('searchFoods', []))
    );
  }
  */
  //////// Save methods //////////
  /*
  // POST: add a new food to the server
  addFood (food: Food): Observable<Food> {
    return this.http.post<Food>(this.foodsUrl, food, httpOptions).pipe(
      tap((newFood: Food) => this.log(`added food w/ id=${newfood.id}`)),
      catchError(this.handleError<Food>('addFood'))
    );
  }
  */
  /*
  // DELETE: delete the food from the server
  deleteFood (food: Food | number): Observable<Food> {
    const id = typeof food === 'number' ? food : food.id;
    const url = `${this.foodsUrl}/${id}`;

    return this.http.delete<Food>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted food id=${id}`)),
      catchError(this.handleError<Food>('deleteFood'))
    );
  }
  */
 /*
  // PUT: update the food on the server
  updateFood (food: Food): Observable<any> {
    return this.http.put(this.foodsUrl, food, httpOptions).pipe(
      tap(_ => this.log(`updated food id=${food.id}`)),
      catchError(this.handleError<any>('updateFood'))
    );
  }
  */
}
