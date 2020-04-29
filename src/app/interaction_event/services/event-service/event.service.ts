import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  getAllEvent(): Observable<any> {
    return this.http.get(environment.baseUrl + 'listEvent');
  }

  getEventById(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + 'event/' + id);
  }

}
