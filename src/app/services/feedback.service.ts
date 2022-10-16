import { Injectable } from '@angular/core';
import { Observable ,of} from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private processHTTPMsgService:ProcessHTTPMsgService) { }

  putFeedback(feedback:Feedback):Observable<Feedback>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content_Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL+ 'feedback',feedback,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
      }

      // getFeedbackIds(feedback:Feedback): Observable<number | any> {
      //   const httpOptions={
      //     headers:new HttpHeaders({
      //       'Content_Type': 'application/json'
      //     })
      //   };
      //   return this.http.get(baseURL + 'feedback' + id,feedback,httpOptions()).pipe(catchError(error=> error));//this.getFeedbackIds().pipe(map(feed => feed.map((feedback: { id: any; }) => feedback.id))).pipe(catchError(error=> error));; // of(DISHES.map(dish=>dish.id));
      // }
      // getFeedbackIds(id:any){
      //   return this.http.get<Feedback>(baseURL + 'feedback'+ id);
        getFeedbackIds(id: string): Observable<Feedback> {
          return this.http.get<Feedback>(baseURL + 'feedback/'+id).pipe(catchError(this.processHTTPMsgService.handleError));
      }
}
