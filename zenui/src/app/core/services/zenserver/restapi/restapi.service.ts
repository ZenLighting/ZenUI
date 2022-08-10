import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DeviceInformationResponse, ListDeviceRequest} from "src/app/core/models/devices";
import {ListRoomResponse, RoomModel} from "../../../models/room";

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
    let response = await this.http.get<ListDeviceRequest>(environment.zenServerAddress+"/device/").toPromise();
    return response;
  }

  async getDeviceInformation(id: number): Promise<DeviceInformationResponse>{
    let response = await this.http.get<DeviceInformationResponse>(environment.zenServerAddress+`/device/${id}`).toPromise();
    return response;
  }

  async setDeviceColor(name: string, r, g, b){
    let response = await this.http.post(environment.zenServerAddress+`/device/${name}/set_color`, {
      "color-protocol": "rgb",
      r: r,
      g: g,
      b: b,
      brightness: 255
    }).toPromise();
    return response;
  }

  async listRooms(){
    let response = await this.http.get<ListRoomResponse>(environment.zenServerAddress+"/room").toPromise();
    return response;
  }

  async createRoom(newRoom: RoomModel){
    let response = await this.http.post<String>(environment.zenServerAddress+"/room", newRoom).toPromise();
    return response;
  }

  async deleteRoom(roomName: string){
    let response = await this.http.delete<String>(environment.zenServerAddress+"/room/"+roomName).toPromise();
    return response;
  }

  async addLightToRoom(roomName: string, lightId: number, positionX: number, positionY: number){
    let response = await this.http.post<String>(environment.zenServerAddress+"/room/"+roomName+"/add_light", {
      light: lightId,
      x: positionX,
      y: positionY
    }).toPromise();
    return response;
  }

  async setRoomColor(roomName: string, r: number, g: number, b: number){
    let response = await this.http.post<String>(environment.zenServerAddress+"/room/"+roomName+"/set_color", {
      r: r,
      g: g,
      b: b
    }).toPromise();
    return response;
  }
}
