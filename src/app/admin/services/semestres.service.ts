import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SemestresService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  URL_F = 'http://localhost:5000/semestre';
  constructor(private http: HttpClient, private router: Router) {}

  getAllSemestres(): Observable<any> {
    return this.http.get(this.URL_F, {
      headers: this._headers,
    });
  }
  addSemestre(data: any): Observable<any> {
    return this.http.post(this.URL_F, data, {
      headers: this._headers,
    });
  }
  updateSemestre(id: string, data: any): Observable<any> {
    return this.http.patch(this.URL_F + `/${id}`, data, {
      headers: this._headers,
    });
  }
  deleteSemestre(id: string): Observable<any> {
    return this.http.delete(this.URL_F + `/${id}`, {
      headers: this._headers,
    });
  }
  getSemestreById(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}`);
  }
  getSemestreByNumero(numero: string, idF: string): Observable<any> {
    return this.http.get(this.URL_F + `/${numero}/${idF}`, {
      headers: this._headers,
    });
  }
  getSemestreElements(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}/elements`, {
      headers: this._headers,
    });
  }

  addElementToSemestre(id: string, idM: string): Observable<any> {
    return this.http.post(this.URL_F + `/${id}/${idM}`, null, {
      headers: this._headers,
    });
  }
  removeElementFromSemestre(id: string, idM: string): Observable<any> {
    return this.http.delete(this.URL_F + `/${id}/${idM}`, {
      headers: this._headers,
    });
  }
}
