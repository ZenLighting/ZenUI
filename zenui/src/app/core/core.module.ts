import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatSidenavModule} from "@angular/material/sidenav"
import {RestapiService} from "./services/zenserver/restapi/restapi.service"
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    HttpClientModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class CoreModule { }
