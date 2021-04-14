import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { UpdateForm } from '../interfaces/update-form.interface';

import { Usuario } from '../models/user.models';

const url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2:any;
  public usuario: Usuario;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
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

    return this.http.get(`${url}/auth`,{
      headers: {
        'Authorization': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {email, google, name, role, status, img, uid} = resp.user;
        this.usuario = new Usuario( name, email,'',status, img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
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

  actualizarUsuario( formData: UpdateForm){
    formData = { ...formData, role: this.usuario.role };
    return this.http.put(`${url}/users/${this.uid}`, formData, {
      headers: {
      'Authorization': this.token
      }
    })
  }

  login( formData: LoginForm ){
    return this.http.post(`${url}/auth/login`, formData).pipe(tap((resp: any)=> { localStorage.setItem('token',resp.token)}));
  }

  loginGoogle( id_token: any ){
    return this.http.post(`${url}/auth/google`, {id_token}).pipe(tap((resp: any)=> { localStorage.setItem('token',resp.token)}));
  }

}
