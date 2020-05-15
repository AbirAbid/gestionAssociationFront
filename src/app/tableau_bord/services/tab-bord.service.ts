import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TabBordService {

  constructor(private http: HttpClient) {
  }

  /***List biens by user***/
  getAllParticiperBienByUser(username: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'listBienByUser/' + username);
  }

  /***List Mission by user***/


  getAllParticiperMissionByUser(username: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'listMissionByUser/' + username);
  }
}
