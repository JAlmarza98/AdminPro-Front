import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public name: string,
    public email: string,
    public password: string,
    public status?: boolean,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
  ){}

  get imagenUrl(){
    if( this.img ){
      if(this.img.includes('https')){
        return this.img;
      }
      return `${ base_url }/uploads/users/${ this.img }`;
    }
    return `${ base_url }/uploads/users/no-image`;
  }
}
