import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatSidenavModule} from "@angular/material/sidenav"
import {RestapiService} from "./services/zenserver/restapi/restapi.service"
import {HttpClientModule} from "@angular/common/http";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from "@angular/material/tabs";
@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class CoreModule { }
