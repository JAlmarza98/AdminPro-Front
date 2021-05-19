import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Graficas', url: 'grafica1' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Promesas', url: 'promesas' },
        { title: 'RxJS', url: 'rxjs' },
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: 'users' },
        { title: 'Medicos', url: 'doctors' },
        { title: 'Hospitales', url: 'hospitals' }
      ]
    }
  ];

  constructor() { }
}
