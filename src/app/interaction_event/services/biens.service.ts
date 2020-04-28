import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiensService {

  constructor(private http: HttpClient) {
  }

  getAllBien(): Observable<any> {
    return this.http.get(environment.baseUrl + 'listBien');
  }

  getAllBienRegion(ville: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'listBienRegion/' + ville);
  }
}
