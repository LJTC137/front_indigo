import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PartyHard';

  
  constructor(
    private router: Router,
    private iconSetService: IconSetService
  ) {
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
