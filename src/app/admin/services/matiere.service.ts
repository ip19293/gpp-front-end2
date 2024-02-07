import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  constructor(private http: HttpClient, private router: Router) {}

  getAllMatieres(): Observable<any> {
    return this.http.get('http://localhost:5000/matiere', {
      headers: this._headers,
    });
  }
  getMatiere(id: any): Observable<any> {
    return this.http.get(`http://localhost:5000/matiere/${id}`, {
      headers: this._headers,
    });
  }

  uploadsMatieres(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/matiere/upload', data);
  }
  addMatiere(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/matiere', data, {
      headers: this._headers,
    });
  }
  deleteMatiere(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/matiere/${id}`, {
      headers: this._headers,
    });
  }
  updateMatiere(id: string, data: any): Observable<any> {
    return this.http.patch(`http://localhost:5000/matiere/${id}`, data, {
      headers: this._headers,
    });
  }
  getProfesseursByMatiereId(id: any): Observable<any> {
    return this.http.get(`http://localhost:5000/matiere/${id}/professeurs`, {
      headers: this._headers,
    });
  }
  getElementsByMatiereId(id: any): Observable<any> {
    return this.http.get(`http://localhost:5000/matiere/${id}/elements`, {
      headers: this._headers,
    });
  }
}
