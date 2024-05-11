import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Binarybox-Api-Key': environment.apiKey
    })
  }

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.apiUrl + '/api/register', user, this.httpOptions);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/login', { email, password }, this.httpOptions)
      .pipe(tap(() => (this.isLoggedIn = true)));
  }

  logoutUser(token: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/logout', { token }, this.httpOptions);
  }
}
