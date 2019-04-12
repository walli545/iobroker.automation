import {DeviceId} from './DeviceId';

/**
 * Source device.
 */
export interface Device {
    /**
     * {@link DeviceId} of the device.
     */
    id: DeviceId;

    /**
     * Room where the device is located.
     */
    room: string;
}
