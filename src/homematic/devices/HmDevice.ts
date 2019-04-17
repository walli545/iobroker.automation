import {Device} from '../../interfaces/devices/Device';
import {DeviceId} from '../../interfaces/devices/DeviceId';
import {StateService} from '../../interfaces/services/StateService';

/**
 * Source base class for all homematic devices.
 */
export abstract class HmDevice implements Device {
    private readonly _id: DeviceId;

    private readonly _room: string;

    /**
     * Creates a new device.
     * @param id The {@link DeviceId} of the device.
     * @param room The room where the device is located.
     * @param stateService The {@link StateService} the device uses to retrieve
     *  its state values.
     */
    protected constructor(id: DeviceId, room: string, protected readonly stateService: StateService) {
        if (!id) {
            throw new Error('deviceId may not be undefined');
        }
        if (!room) {
            throw new Error('room may not be undefined/empty');
        }
        if (!stateService) {
            throw new Error('stateService may not be undefined');
        }
        this._id = id;
        this._room = room;
    }

    /**
     * The {@link DeviceId} of the device.
     */
    get id(): DeviceId {
        return this._id;
    }

    /**
     * The room where the device is located.
     */
    get room(): string {
        return this._room;
    }
}
