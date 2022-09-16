import { Component, ViewChild } from '@angular/core';
import {SidenavComponent} from "./core/components/sidenav/sidenav.component"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("sidenav") sidenav: SidenavComponent;
  title = 'zenui';

  events: string[] = [];
  opened: boolean;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  toggleSideNav(){
    this.sidenav.toggle();
  }
}
