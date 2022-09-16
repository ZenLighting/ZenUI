import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/core/models/devices';
import {RestapiService, DeviceInformation} from "../../../core/services/zenserver/restapi/restapi.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private lights: Array<Device> = [];
  public selectedLights: Array<any> = [
    /*{name: "asdasd", address: "123", grid: [
      [{index: 1, r: 255, g: 0, b:0}, 0, 0],
      [0, {index: 1, r: 255, g: 0, b:0}, 0],
      [0, 0, {index: 1, r: 255, g: 0, b:0}]
    ]},
    {name: "asdasd", address: "123", grid: [[{index: 1, r: 255, g: 255, b:255}]]},
    {name: "asdasd", address: "123", grid: [[{index: 1, r: 255, g: 255, b:255}]]}*/
  ];

  private toggle = true;

  constructor(private zenServer: RestapiService) { }

  async ngOnInit(): Promise<void> {
    let response = await this.zenServer.listDevices();
    this.lights = response.devices;
    this.selectedLights = this.lights;
  }

  async toggleColor(macaddress: string){
    let response = null;
    if(this.toggle){
      response = await this.zenServer.setDeviceColor(macaddress, 255, 255, 255);
    } else{
      response = await this.zenServer.setDeviceColor(macaddress, 0, 0, 0);
    }
    console.log(response);
    this.toggle = !this.toggle;
  }
}
