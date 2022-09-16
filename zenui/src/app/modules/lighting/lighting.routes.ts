import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import { RoomsHomeComponent } from "./rooms-home/rooms-home.component";

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "rooms", component: RoomsHomeComponent}
]
