import {Device} from "./devices";

export interface LightInRoom{
    x: number;
    y: number;
    light: Device;
}

export interface RoomModel{
    name: string;
}

export interface RoomAsJSON{
    model: RoomModel;
    grid: string;
    lights: Array<LightInRoom>
}

export interface ListRoomResponse{
    rooms: Array<RoomAsJSON>
}

export interface GetRoomResponse{
    room: RoomAsJSON;
}