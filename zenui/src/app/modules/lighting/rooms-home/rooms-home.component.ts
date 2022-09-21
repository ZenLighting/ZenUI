import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoomAsJSON } from 'src/app/core/models/room';
import {RestapiService} from "../../../core/services/zenserver/restapi/restapi.service";

@Component({
  selector: 'app-rooms-home',
  templateUrl: './rooms-home.component.html',
  styleUrls: ['./rooms-home.component.css']
})
export class RoomsHomeComponent implements OnInit {
  rooms: BehaviorSubject<Array<RoomAsJSON>> = new BehaviorSubject([])
  computedColor: Map<string, string> = new Map();
  //roomCardStates: List[]

  constructor(
    private api: RestapiService
  ) { }

  ngOnInit(): void {
    this.api.listRooms().then((result) => {
      console.log("ROOMS", result);
      this.rooms.next(result.rooms);
      this.computeColorsOfRooms();
    }).catch(e => console.log("Failed to fetch rooms"+e))
  }

  computeColorsOfRooms(){
    this.rooms.value.forEach((room) => {
      this.computedColor.set(room.model.name, 'black')
    })
  }

}
