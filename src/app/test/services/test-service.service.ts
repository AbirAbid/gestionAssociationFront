import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
//HttpClient library
  constructor(private http: HttpClient) {
  }


  getAllUser(): Observable <any> {
    console.log(this.http.get<any>('https://jsonplaceholder.typicode.com/users'))

    return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }
}
