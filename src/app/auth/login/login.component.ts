import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from '../../services/user.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email:[ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]],
    remember:[localStorage.getItem('remember') || false]
  });

  constructor(private router:Router , private fb: FormBuilder, private userService: UserService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    this.userService.login(this.loginForm.value).subscribe( resp => {
      if(this.loginForm.get('remember')?.value){
        localStorage.setItem('email',this.loginForm.get('email')?.value);
        localStorage.setItem('remember','true');
      }else{
        localStorage.removeItem('email');
        localStorage.removeItem('remember');
      }
      this.router.navigateByUrl('/');
    },(err) => {
      Swal.fire('Error', err.error.message, 'error');
    });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '234146209472-s4vqv5en4m8fqg93sa837v8dr2v378m4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;

          this.userService.loginGoogle(id_token).subscribe( resp => this.ngZone.run( () => this.router.navigateByUrl('/') ) );

        },(error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
