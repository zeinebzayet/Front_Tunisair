import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aeroport, Avion, EntrepriseRestauration, Staff, vol } from './vol.component';

@Injectable({
  providedIn: 'root'
})
export class VolService {

  private baseUrl = "http://localhost:8080/api/vol";
  private baseUrlarpt = "http://localhost:8080/api/aeroport";
  private baseUrlav = "http://localhost:8080/api/avion";
  private baseUrlese = "http://localhost:8080/api/entrepriseResto";
  private baseUrlstaff = "http://localhost:8080/api/staff";

  private baseUrl1= "http://localhost:8080/api/avions";
  constructor(private http: HttpClient) { }

  getAllVol(): Observable<vol[]>{
    return this.http.get<vol[]>(`${this.baseUrl}`);
  }


  addVol(idav:number,idstaff:number,idese:number,idaerprtdep:number,idaerprtar:number,vol:vol): Observable<vol>{
    return this.http.post<vol>(`${this.baseUrl1}/${idav}/staffs/${idstaff}/entreprises/${idese}/aeroportsdep/${idaerprtdep}/aeroportsarrv/${idaerprtar}/vol`,vol);
  }

  updateVol(id :number,vol: vol): Observable<vol>{
    return this.http.put<vol>(`${this.baseUrl}/${id}`,vol);
  }

  getAllAvion(): Observable<Avion[]>{
    return this.http.get<Avion[]>(`${this.baseUrlav}`);
  }


  getAllAeroport(): Observable<Aeroport[]>{
    return this.http.get<Aeroport[]>(`${this.baseUrlarpt}`);
  }


  getAllEse(): Observable<EntrepriseRestauration[]>{
    return this.http.get<EntrepriseRestauration[]>(`${this.baseUrlese}`);
  }
  getAllStaff(): Observable<Staff[]>{
    return this.http.get<Staff[]>(`${this.baseUrlstaff}`);
  }

  deleteVol(volId: number): Observable<vol[]> {
    return this.http.delete<vol[]>(`${this.baseUrl}/${volId}`);
  }

  deleteAllVol(): Observable<vol[]> {
    return this.http.delete<vol[]>(`${this.baseUrl}`);
  }



}
