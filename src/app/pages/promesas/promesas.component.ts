import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  public usuarios:any =[]
  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => {
      this.usuarios = usuarios;
      console.log(usuarios);
    })

    // const promesa = new Promise((resolve, reject) => {

    //   if(true){
    //     resolve('Hola Mundo!');
    //   }else{
    //     reject('Algo salio mal');
    //   }
    // })

    // promesa.then((msg) => {
    //   console.log('Hey termine');
    //   console.log(msg);
    // })
    // .catch( error => console.log('Error en mi promesa'+ error));

    // console.log('Fin del init');
  }

  getUsuarios(){

    return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve(body.data) );

    });

  }

}
