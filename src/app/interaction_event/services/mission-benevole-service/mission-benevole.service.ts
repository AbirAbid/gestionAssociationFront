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
    return this.http.post<string>(environment.authentificateUrl + 'participerMission/' + username, participerMissionForm);
  }
  getMissionByEvent(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + 'listMissionBenevoleEvent/'  + id);
  }
  getMissionPart(username: string, id: number): Observable<any> {
    return this.http.get(environment.authentificateUrl + 'listMissionDisplay/' + username + '/' + id);
  }

  annulerDemande(id: number, username: string): Observable<any> {
    return this.http.post<string>(environment.authentificateUrl + 'annulerDemande/' + username, id);
  }
}
