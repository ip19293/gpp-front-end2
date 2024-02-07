import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  URL_F = 'http://localhost:5000/element';
  constructor(private http: HttpClient, private router: Router) {}

  getAllElements(): Observable<any> {
    return this.http.get(this.URL_F, {
      headers: this._headers,
    });
  }
  addElement(data: any): Observable<any> {
    return this.http.post(this.URL_F, data, {
      headers: this._headers,
    });
  }
  uploadElements(id: string, data: any): Observable<any> {
    return this.http.post(this.URL_F + `/upload/${id}`, data, {
      headers: this._headers,
    });
  }
  getElementById(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}`, {
      headers: this._headers,
    });
  }
  getElementsBySemestre(semestre: string): Observable<any> {
    return this.http.get(this.URL_F + `/semestre/${semestre}`, {
      headers: this._headers,
    });
  }
  getElementProfesseurs(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}/professeurs`, {
      headers: this._headers,
    });
  }
  deletEelement(id: string): Observable<any> {
    return this.http.delete(this.URL_F + `/${id}`, {
      headers: this._headers,
    });
  }
  updateElement(id: string, data: any): Observable<any> {
    return this.http.patch(this.URL_F + `/${id}`, data, {
      headers: this._headers,
    });
  }
  getGroupsByElementId(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}/groups`, {
      headers: this._headers,
    });
  }
}
