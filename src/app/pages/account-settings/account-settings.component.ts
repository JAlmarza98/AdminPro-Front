import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public links: NodeListOf<Element>;

  constructor(private settingsService:SettingsService) {
    this.links = document.querySelectorAll('.selector');
  }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string ){
    this.settingsService.changeTheme( theme );
  }

}
