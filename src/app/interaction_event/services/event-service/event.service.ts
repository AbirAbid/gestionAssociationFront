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

  /*** List all event***/
  getAllEvent(): Observable<any> {
    return this.http.get(environment.baseUrl + 'listEvent');
  }

  /*** event by id***/

  getEventById(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + 'event/' + id);
  }

  /*** list biens by event id ***/

  getAllBienByEvent(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + 'listBienEvent/' + id);
  }

  /*** list missions by event id ***/
  getAllMissionByEvent(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + 'listMissionBenevoleEvent/' + id);
  }


}
