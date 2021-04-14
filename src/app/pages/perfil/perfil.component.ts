import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/user.models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm:FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder, private userServide: UserService, private  fileUpload:FileUploadService) {
    this.usuario = userServide.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [this.usuario.name, Validators.required],
      email:[this.usuario.email, [ Validators.required, Validators.email ]]
    })
  }

  actualizarPerfil(){
    this.userServide.actualizarUsuario( this.perfilForm.value ).subscribe( resp => {
      const { name, email } = this.perfilForm.value;
      this.usuario.name = name;
      this.usuario.email = email;
      Swal.fire('OK!', 'Su información ha sido actualizada con existo', 'success');
    },(err) => {
      Swal.fire('Error', err.error.errors[0].msg, 'error');
    })
  }

  cambiarImagen( event ){
    const file: File = event.target.files[0]
    this.imagenSubir = file;

    if(!file){ return this.imgTemp = null;}

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUpload.actualizarFoto(this.imagenSubir, 'users', this.usuario.uid)
    .then( resp => {
      if(!resp.fileName){
        Swal.fire('Error', resp.msg, 'error');
      }else{
        this.usuario.img = resp.fileName;
        Swal.fire('OK!', resp.msg, 'success');
      }

    })
  }

}
