import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs';
import { Device } from 'src/app/core/models/devices';
import { RestapiService } from 'src/app/core/services/zenserver/restapi/restapi.service';
import { GridControlComponent } from '../grid-control/grid-control.component';

@Component({
  selector: 'app-light-info-card',
  templateUrl: './light-info-card.component.html',
  styleUrls: ['./light-info-card.component.css']
})
export class LightInfoCardComponent implements OnInit, AfterViewInit {
  @Input("device") device: Device;
  @ViewChild(GridControlComponent) gridControl: GridControlComponent;
  public on: boolean;

  constructor(
    private api: RestapiService
  ) { }

  ngOnInit(): void {
    console.log(this.device)
  }

  ngAfterViewInit(): void {
    if(this.device.last_address != null){
      setInterval(() => {
        this.api.getDeviceInformation(this.device.id).then((response) => {
          this.gridControl.gridString.next(response.grid);
        });
      }, 1000)
      this.gridControl.lightOnState.subscribe((onState) => {
        this.on = onState;
      });
      this.gridControl.colorChangeEvent.subscribe((newColor) => {
        console.log(newColor);
        this.setColor(newColor);
        //this.api.setDeviceColor(this.device.name, )
      })
    }
    //setInterval(() => this.drawGridOnCanvas(), 500);
  }

  setColor(colorHex: string){
    let r = Number.parseInt(colorHex.slice(1, 3), 16);
    let g = Number.parseInt(colorHex.slice(3, 5), 16);
    let b = Number.parseInt(colorHex.slice(5, 7), 16);
    this.api.setDeviceColor(this.device.id.toString(), r, g, b).then((response) => console.log(response));
  }
}
