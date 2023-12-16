import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  URL_F = 'http://localhost:5000/group';
  constructor(private http: HttpClient, private router: Router) {}

  getGroupEmploisByFilliereId(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/filliere-semestre/${id}`, {
      headers: this._headers,
    });
  }
  getAllGroupsByFilliereId(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/filliere-groups/${id}`, {
      headers: this._headers,
    });
  }
  addGroup(data: any): Observable<any> {
    return this.http.post(this.URL_F, data, {
      headers: this._headers,
    });
  }
  updateGroup(id: string, data: any): Observable<any> {
    return this.http.patch(this.URL_F + `/${id}`, data, {
      headers: this._headers,
    });
  }
  removeGroupById(id: string): Observable<any> {
    return this.http.delete(this.URL_F + `/${id}`, {
      headers: this._headers,
    });
  }
  getGroupById(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}`, {
      headers: this._headers,
    });
  }
  getGroupEmplois(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}/emplois`, {
      headers: this._headers,
    });
  }
  getGroupByNumero(numero: string, idF: string): Observable<any> {
    return this.http.get(this.URL_F + `/${numero}/${idF}`, {
      headers: this._headers,
    });
  }
  getGroupEmploi(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}/emploi`, {
      headers: this._headers,
    });
  }
  addEmploiToGroup(id: string, data: any): Observable<any> {
    return this.http.post(this.URL_F + `/${id}/emploi`, data, {
      headers: this._headers,
    });
  }

  updateEmploi(id: string, data: any): Observable<any> {
    return this.http.patch(this.URL_F + `/${id}/emploi`, data, {
      headers: this._headers,
    });
  }
  removeEmploiFromGroup(id: string, idE: string): Observable<any> {
    return this.http.delete(this.URL_F + `/${id}/${idE}`, {
      headers: this._headers,
    });
  }
}
