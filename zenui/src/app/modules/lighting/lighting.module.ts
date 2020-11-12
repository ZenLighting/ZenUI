import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {routes} from "./lighting.routes";
import { LightInfoCardComponent } from './common/light-info-card/light-info-card.component';


@NgModule({
  declarations: [HomeComponent, LightInfoCardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class LightingModule { }
