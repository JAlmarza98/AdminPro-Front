import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/user.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http:HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'Authorization': this.token
        }
    }
  }

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }

  buscar(
    tipo: 'users'|'doctors'|'hospitals',
    termino: string
  ) {

  const url = `${ base_url }/search/collection/${ tipo }/${ termino }`;
  return this.http.get<any[]>( url, this.headers )
          .pipe(
            map( (resp: any ) => {

              switch ( tipo ) {
                case 'users':
                  return this.transformarUsuarios( resp.results )

                default:
                  return [];
              }

            })
          );

}
}
