import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesseurService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  constructor(private http: HttpClient, private router: Router) {}

  getAllProfesseurs(): Observable<any> {
    return this.http.get('http://localhost:5000/professeur', {
      headers: this._headers,
    });
  }
  getProfesseur(id: any): Observable<any> {
    return this.http.get(`http://localhost:5000/professeur/${id}`, {
      headers: this._headers,
    });
  }
  getProfesseurByEmail(email: any): Observable<any> {
    return this.http.get(`http://localhost:5000/professeur/${email}/email`, {
      headers: this._headers,
    });
  }

  addProfesseur(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:5000/professeur',

      data,
      {
        headers: this._headers,
      }
    );
  }
  deleteProfesseur(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/professeur/${id}`, {
      headers: this._headers,
    });
  }
  updateProfesseur(id: string, data: any): Observable<any> {
    return this.http.patch(
      `http://localhost:5000/professeur/${id}`,

      data,
      {
        headers: this._headers,
      }
    );
  }

  getProfesseurCours(id: any): Observable<any> {
    return this.http.get(
      `http://localhost:5000/professeur/${id}/cours`,

      {
        headers: this._headers,
      }
    );
  }

  getProfCoursNon(id: any): Observable<any> {
    return this.http.get(
      `http://localhost:5000/professeur/${id}/cours-non`,

      {
        headers: this._headers,
      }
    );
  }
  addMatiereToProfesseur(id: any, data: any): Observable<any> {
    return this.http.post(
      `http://localhost:5000/professeur/${id}`,

      data,
      {
        headers: this._headers,
      }
    );
  }
  addCoursToProfesseur(id: any, data: any): Observable<any> {
    return this.http.post(
      `http://localhost:5000/professeur/${id}/cours`,

      data,
      {
        headers: this._headers,
      }
    );
  }

  deleteOneMatFromProf(id: any, idM: any): Observable<any> {
    return this.http.delete(`http://localhost:5000/professeur/${id}/${idM}`, {
      headers: this._headers,
    });
  }
}
