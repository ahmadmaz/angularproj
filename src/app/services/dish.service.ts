import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable ,of} from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processHTTPMsgService:ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
  return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
  console.log(baseURL + 'dishes')
  }

getDish(id: string): Observable<Dish> {
  //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  return this.http.get<Dish>(baseURL + 'dishes/'+id).pipe(catchError(this.processHTTPMsgService.handleError)); //of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
}

getFeaturedDish(): Observable<Dish>{
  return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));//.pipe(catchError(this.processHTTPMsgService.handleError));;
//of(DISHES.filter((dish) => dish.features)[0]).pipe(delay(2000)); 
}

getDishIds(): Observable<number[] | any> {
  return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error=> error));; // of(DISHES.map(dish=>dish.id));
}
putDish(dish:Dish):Observable<Dish>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content_Type': 'application/json'
    })
  };
  return this.http.put<Dish>(baseURL + 'dishes/' + dish.id,dish,httpOptions)
  .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  }