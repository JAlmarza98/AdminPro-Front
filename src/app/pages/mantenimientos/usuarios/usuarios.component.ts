import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { SearchService } from '../../../services/search.service';

import { Usuario } from '../../../models/user.models';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public page: number = 1;
  public max_page: number = 0;
  public cargando: boolean = true;

  constructor( private userService: UserService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;

    this.userService.cargarUsuarios(this.page).subscribe( ({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      if(total % 10 == 0){
        this.max_page = total / 10;
      }else{
        this.max_page = Math.trunc(total/10) + 1;
      }
      this.cargando = false;
    });
  }

  cambiarPagina( valor:number ){

    this.page += valor;

    if(this.page < 0){
      this.page = 0;
    }else if( this.page >= this.max_page){
      this.page = this.max_page;
    }

    this.userService.cargarUsuarios(this.page).subscribe( ({usuarios}) => {this.usuarios = usuarios;})
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }

    return this.searchService.buscar( 'users', termino )
        .subscribe( resp => {

          this.usuarios = resp;

        });
  }

  eliminarUsuario( usuario: Usuario){
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.name}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.eliminarUsuario( usuario ).subscribe( resp =>{

          this.cargarUsuarios();

          Swal.fire(
            '¡Eliminado!',
            `${usuario.name} ha sido eliminado con exito`,
            'success'
          );

          }, error =>

          Swal.fire(
            'Error',
            error.error.message,
            'warning'
          )

        )
      }
    })
  }
}
