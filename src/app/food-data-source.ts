import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { PageCount } from './page-count';
import { Food } from './food';
import { FoodService } from './food.service';

export class FoodDataSource implements DataSource<Food> {
    // safeCount = new PageCount(0);

    private foodsSubject = new BehaviorSubject<Food[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private pageSubject = new BehaviorSubject<number>(99);

    // Allows the table to toggle the loading flag on and off
    public loading$ = this.loadingSubject.asObservable();
    // Allows the table to get total page count based on filter value
    public elementCount$ = this.pageSubject.asObservable();
    /*
    public get elementCount$() {
        return this._elementCount$;
    }
    public set pageCount$(value) {
        this._elementCount$ = value;
    }
    */
    constructor(private foodService: FoodService) {
    }

    loadFoods(filter: string, sortDirection: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);

        this.foodService.findFoods(filter, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([]))
                // finalize(() => this.loadingSubject.next(false))
            ).subscribe(foods => this.foodsSubject.next(foods));

        this.foodService.getFoodsCount(filter)
            .pipe(
                catchError(() => of(0)),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe(count => this.pageSubject.next(count));

    }

    connect(collectionViewer: CollectionViewer): Observable<Food[]> {
        console.log('Connecting data source');
        return this.foodsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.foodsSubject.complete();
        this.loadingSubject.complete();
        this.pageSubject.complete();
    }
}
