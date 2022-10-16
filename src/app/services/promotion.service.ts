import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { LEADERS } from '../shared/leaders';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import {of,delay} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map , catchError} from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,private processHTTPMsgService:ProcessHTTPMsgService) { }


  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'Promotion').pipe(delay(2000)).pipe(catchError(this.processHTTPMsgService.handleError));//of(PROMOTIONS).pipe(delay(2000)).pipe(catchError(this.processHTTPMsgService.handleError));;;
}

getPromotion(id: string): Observable<Promotion> {
  return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
}                       //.pipe(map(leaders => leaders[0]));

getFeaturedPromotion(): Observable <Promotion> {
  return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
  }
}
