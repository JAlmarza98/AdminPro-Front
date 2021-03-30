import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2:any;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${url}/auth`,{
      headers: {
        'Authorization': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( err => of(false))
    );
  }

  googleInit(){

    return new Promise( resolve => {

      console.log('google init');

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '234146209472-s4vqv5en4m8fqg93sa837v8dr2v378m4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
      });
    })
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${url}/users`, formData).pipe(tap((resp: any)=> { localStorage.setItem('token',resp.token)}));
  }

  login( formData: LoginForm ){
    return this.http.post(`${url}/auth/login`, formData).pipe(tap((resp: any)=> { localStorage.setItem('token',resp.token)}));
  }

  loginGoogle( id_token: any ){
    return this.http.post(`${url}/auth/google`, {id_token}).pipe(tap((resp: any)=> { localStorage.setItem('token',resp.token)}));
  }

}
