import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {routes} from "./lighting.routes";
import { LightInfoCardComponent } from './common/light-info-card/light-info-card.component';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RoomsHomeComponent } from './rooms-home/rooms-home.component';

@NgModule({
  declarations: [HomeComponent, LightInfoCardComponent, RoomsHomeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    RouterModule
  ]
})
export class LightingModule { }
