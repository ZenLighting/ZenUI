import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { GridControlComponent } from '../grid-control/grid-control.component';
import { Device } from 'src/app/core/models/devices';
import { RestapiService } from 'src/app/core/services/zenserver/restapi/restapi.service';
import { RoomModel } from 'src/app/core/models/room';

@Component({
  selector: 'app-room-info-card',
  templateUrl: './room-info-card.component.html',
  styleUrls: ['./room-info-card.component.css']
})
export class RoomInfoCardComponent implements OnInit {
  @Input("room") room: RoomModel;
  @ViewChild(GridControlComponent) gridControl: GridControlComponent;
  public on: boolean;

  constructor(
    private api: RestapiService
  ) { }

  ngOnInit(): void {
    console.log(this.room)
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.api.getRoom(this.room.name).then((response) => {
        console.log(response);
        this.gridControl.gridString.next(response.room.grid);
      })
    }, 1000)
    this.gridControl.lightOnState.subscribe((onState) => {
      this.on = onState;
    });
    this.gridControl.colorChangeEvent.subscribe((newColor) => {
      console.log(newColor);
      this.setColor(newColor);
      //this.api.setDeviceColor(this.device.name, )
    })
    //setInterval(() => this.drawGridOnCanvas(), 500);
  }

  setColor(colorHex: string){
    let r = Number.parseInt(colorHex.slice(1, 3), 16);
    let g = Number.parseInt(colorHex.slice(3, 5), 16);
    let b = Number.parseInt(colorHex.slice(5, 7), 16);
    this.api.setRoomColor(this.room.name, r, g, b).then((response) => console.log(response));
  }

}
