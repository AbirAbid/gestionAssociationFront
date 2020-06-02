import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {httpOptions} from '../../../membre_auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class BiensService {

  constructor(private http: HttpClient) {
  }

  getAllBien(): Observable<any> {
    return this.http.get(environment.bienUrl + 'listBien', {responseType: 'json'});
  }

  getAllBienRegion(ville: string): Observable<any> {
    return this.http.get(environment.bienUrl + 'listBienRegion/' + ville, {responseType: 'json'});
  }

  donnerBien(participerBienForm: any, username: string): Observable<any> {
    return this.http.post<string>(environment.authentificateUrl + 'donnerBien/' + username, participerBienForm, httpOptions);
  }
}
