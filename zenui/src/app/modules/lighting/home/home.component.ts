import { Component, OnInit } from '@angular/core';
import {RestapiService, DeviceInformation} from "../../../core/services/zenserver/restapi/restapi.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private lights: Array<any> = [];
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
    let macAddrs = await this.zenServer.listDevices();
    console.log(macAddrs);
    let requests = []
    macAddrs.forEach((addr) => {
      let promise = this.zenServer.getDeviceInformation(addr);
      requests.push(promise);
    })
    let values = await Promise.all(requests);
    values.forEach((value) => {
      this.lights.push({
        mac: value.mac,
        grid: value.grid,
        address: value.address
      });
    })
    this.selectedLights = this.lights;
    setInterval(async () => {
      macAddrs.forEach((addr) => {
        let promise = this.zenServer.getDeviceInformation(addr);
        requests.push(promise);
      })
      let values = await Promise.all(requests);
      values.forEach((value) => {
        for(let i =0; i<this.lights.length; i++){
          if(this.lights[i].mac == value.mac){
            this.lights[i].grid = value.grid;
          }
        }
      })
      this.selectedLights = this.lights;
    }, 500);
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
