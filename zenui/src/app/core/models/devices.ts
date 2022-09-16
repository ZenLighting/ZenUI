export interface Device{
    id: number;
    name: string;
    grid_string: string;
    last_address: string | null;
}

export interface PartialDevice{
    name: string;
    last_address: string;
}

export interface ListDeviceRequest{
    devices: Array<Device>;
    partials: Array<PartialDevice>;
}

export interface DeviceInformationResponse{
    grid: string;
    address: string;
    object: Device;
}