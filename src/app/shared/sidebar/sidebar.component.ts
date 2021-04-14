import { Component } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

import { Usuario } from '../../models/user.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

export class SidebarComponent  {

  public usuario: Usuario;
  public menuItems: any[];

  constructor( private sidebarService: SidebarService, private userService:UserService ) {
    this.menuItems = sidebarService.menu;
    this.usuario = userService.usuario;
  }

  logout(){
    this.userService.logout();
  }

}
