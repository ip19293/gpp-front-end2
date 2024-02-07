import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _headers = {
    Authentication: 'Bearer ' + localStorage.getItem('token'),
  };
  profileInfo: any;
  isLogin = false;
  token = '';
  requet: any;
  constructor(private http: HttpClient, private router: Router) {}
  login(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/auth/login', data);
  }

  signup(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/auth/signup', data);
  }
  forget(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/auth/forgotPassword', data);
    /*     .subscribe((result: any) => {
        this.router.navigate(['/admin/login/reset']);
        alert(`STATUS:${result.status} ${result.message}`);
      }); */
  }

  reset(data: any, token: string) {
    console.log(token);
    this.http
      .patch(`http://localhost:5000/auth/resetPassword/${token}`, data)
      .subscribe((res) => {
        console.log(res);
      });
  }
  profile() {
    let header = {
      Authentication: 'Bearer ' + localStorage.getItem('token'),
    };
    return this.profileInfo;
  }
}
