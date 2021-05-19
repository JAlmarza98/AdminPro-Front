import { Usuario } from '../models/user.models';

export interface CargarUsuario {

  total_users: number,
  users: Usuario[]

}
