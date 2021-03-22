import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

//@ts-ignore
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public year = new Date().getFullYear();

  constructor( private settingsService:SettingsService ){
  }

  ngOnInit(){
    customInitFunctions();
  }
}
