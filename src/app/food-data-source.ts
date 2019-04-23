import { DataSource } from '@angular/cdk/collections';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Food } from './food';
import { FoodService } from './food.service';

export class FoodDataSource implements DataSource<Food> {

    private foodsSubject = new BehaviorSubject<Food[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private pageSubject = new BehaviorSubject<number>(0);

    // Allows the table to toggle the loading flag on and off
    public loading$ = this.loadingSubject.asObservable();
    // Allows the table to get total page count based on filter value
    public elementCount$ = this.pageSubject.asObservable();
    // Allows select?
    public data$ = this.foodsSubject.asObservable();

    constructor(private foodService: FoodService) {
    }

    loadFoods(filter: string, sortId: string, sortDirection: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);

        this.foodService.getFoodsCount(filter)
            .pipe(
                catchError(() => of(10))
            ).subscribe(count => this.pageSubject.next(count));

        this.foodService.findFoods(filter, sortId, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe(foods => this.foodsSubject.next(foods));
    }

    connect(): Observable<Food[]> {
        console.log('Connecting data source');
        return this.foodsSubject.asObservable();
    }

    disconnect(): void {
        this.foodsSubject.complete();
        this.loadingSubject.complete();
        this.pageSubject.complete();
    }
}
