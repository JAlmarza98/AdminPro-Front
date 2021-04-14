import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(file: File, tipo: 'users'|'doctors'|'hospitals', id: string){

    try {

      const url = `${ base_url }/uploads/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('file', file);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json()
      return data

    } catch (error) {
      console.log(error);
      return false
    }
  }
}
