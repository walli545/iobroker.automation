import {Device} from '../devices/Device';
import {DeviceId} from '../devices/DeviceId';

export interface DeviceFactory {
    id: DeviceId | null;

    room: string | null;

    create(): Device | null;
}
