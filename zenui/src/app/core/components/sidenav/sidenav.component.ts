import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav"
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild("sidenav") matnat: MatSidenav;

  constructor() { }

  ngOnInit(): void {
    this.opened = true;
  }

  opened: boolean;

  toggle(){
    this.opened = !this.opened;
    //this.matnat.toggle();
    console.log(this.opened);
  }
}
