import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionBenevoleService {

  constructor(private  http: HttpClient) {
  }


  getAllMission(): Observable<any> {
    return this.http.get(environment.baseUrl + 'listMission');
  }

  getAllMissionRegion(ville: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'listMissionBenevoleRegion/' + ville);
  }

  /**** Participer Mission*****/
  demandeMission(participerMissionForm: any, username: string): Observable<any> {
    return this.http.post<string>(environment.baseUrl + 'participerMission/' + username, participerMissionForm);
  }

  getMissionPart(username: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'listMissionByUser/' + username);
  }
}
