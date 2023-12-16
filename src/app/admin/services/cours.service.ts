import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  constructor(private http: HttpClient, private router: Router) {}

  getAllCours(): Observable<any> {
    return this.http.get('http://localhost:5000/cours', {
      headers: this._headers,
    });
  }
  getCours(id: any): Observable<any> {
    return this.http.get(`http://localhost:5000/cours/${id}`, {
      headers: this._headers,
    });
  }

  addCours(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/cours', data, {
      headers: this._headers,
    });
  }
  deleteCours(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/cours/${id}`, {
      headers: this._headers,
    });
  }
  updateCours(id: string, data: any): Observable<any> {
    return this.http.patch(`http://localhost:5000/cours/${id}`, data, {
      headers: this._headers,
    });
  }
  signeCours(id: string): Observable<any> {
    return this.http.patch(`http://localhost:5000/cours/${id}/signe`, {
      headers: this._headers,
    });
  }
  signeAllCours(): Observable<any> {
    return this.http.patch(`http://localhost:5000/cours/signe`, {
      headers: this._headers,
    });
  }

  getTotalCoursProf(id: any, data: any): Observable<any> {
    return this.http.post(`http://localhost:5000/cours/${id}/cours`, data, {
      headers: this._headers,
    });
  }
  getTotal(): Observable<any> {
    return this.http.get(`http://localhost:5000/cours/total`, {
      headers: this._headers,
    });
  }
}
