import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './compte.component';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http: HttpClient) { }

  
  login(user: User): Observable<any> {
    console.log(user.username);
    console.log(user.password);
    
    return this.http.post<any>(AUTH_API + 'signin', user);
  }
  
  register(cin: number, username: string, email: string, password: string, tel: string,role:string): Observable<any> {
  
    return this.http.post(AUTH_API + 'signup', {
      cin,
      username,
      email,
      tel,
      password,
      role
      
    }, httpOptions);
  }
}
