import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private http: HttpClient) {
  }

  getAllSponsor(): Observable<any> {
    return this.http.get(environment.baseUrl + 'listSponsors');
  }
}
