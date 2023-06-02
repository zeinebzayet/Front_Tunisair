import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/compte/compte.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080/api/user";


  constructor(private http: HttpClient) { }

  getUser(cin: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${cin}`);
  }

  updateUser(cin: number, personne: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${cin}`, personne);
  }
}
