import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { Leader } from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {of} from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map , catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }
  
  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'Leader'); //of(LEADERS).pipe(delay(2000));
};


getFeaturedLeader(): Observable<Leader> {
  return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0])); //of(LEADERS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
}
}
