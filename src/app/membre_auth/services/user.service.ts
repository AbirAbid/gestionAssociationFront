import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthLoginInfo} from '../models/login-info';
import {JwtResponse} from '../models/jwt-response';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrlAuth: 'localhost:8080/api/auth/';
  baseUrl: 'http://localhost:8080/';

  private roles: Array<string> = [];
  CURRENT_USER: any;
  RESET_CURRENT_USER: any;
  result = false;

  constructor(private http: HttpClient) {

    this.CURRENT_USER = {};
    this.CURRENT_USER.profile = {};
    this.CURRENT_USER.isAuthenticated = false;
    this.CURRENT_USER.tokenAuth = '';
    this.RESET_CURRENT_USER = Object.assign({}, this.CURRENT_USER);

  }

  public getCurrentUser() {
    return this.CURRENT_USER;
  }


  public setCurrentUser(currentUser) {
    this.CURRENT_USER = currentUser;
  }

  public saveUserName(username: string) {
    this.CURRENT_USER.username = username;
  }

  public getUserName(): string {
    return this.CURRENT_USER.username;
  }

  public saveToken(token: string) {
    this.CURRENT_USER.tokenAuth = token;
  }

  public getToken(): string {
    return this.CURRENT_USER.tokenAuth;
  }


  public saveAuthorities(authorities: string) {
    this.CURRENT_USER.tokenAuth = authorities;
  }

  public getAuthorities(): string {
    return this.CURRENT_USER.role;
  }

  public getProfileCurrentUser() {
    return this.CURRENT_USER.profile;
  }


  public setRoleUser(role) {
    this.CURRENT_USER.profile.roleName = role;
  }

  public getRoleUser() {
    return this.CURRENT_USER.profile.roleName;
  }

  public setProfileCurrentUser(profile) {
    this.CURRENT_USER.profile = profile;
  }

  public isAuthenticated() {
    return this.CURRENT_USER.isAuthenticated;
  }

  public setIsAuthenticated(auth) {
    this.CURRENT_USER.isAuthenticated = auth;
  }

  public logout() {
    this.CURRENT_USER = Object.assign({}, this.RESET_CURRENT_USER);
    localStorage.removeItem('CUREENT_USER');
  }


  updateUser(id: number, value: any): Observable<any> {
    this.result = true;
    return this.http.put(this.baseUrl + 'users/' + id, value);

  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'getUser/' + username);
  }

  signUp(user: User): Observable<string> {
    return this.http.post<string>(environment.baseUrl + 'signup', user, httpOptions);
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(environment.baseUrl + 'signin', credentials, httpOptions);
  }
}
