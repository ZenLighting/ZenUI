import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export interface DeviceInformation{
  mac: string,
  grid: Array<Array<any>>,
  address: [string, number]
}

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) { }

  async listDevices(){
    let response = await this.http.get<Array<string>>(environment.zenServerAddress+"/devices/").toPromise();
    return response;
  }

  async getDeviceInformation(macAddress: string): Promise<DeviceInformation>{
    let response = await this.http.get<DeviceInformation>(environment.zenServerAddress+`/devices/${macAddress}`).toPromise();
    return response;
  }

  async setDeviceColor(macAddress: string, r, g, b){
    let response = await this.http.post(environment.zenServerAddress+`/devices/${macAddress}/set_color`, {
      r: r,
      g: g,
      b: b,
      brightness: 255
    }).toPromise();
    return response;
  }
}
