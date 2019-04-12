import {DeviceId} from '../../interfaces/devices/DeviceId';
import {StateId} from '../../interfaces/devices/StateId';

/**
 * An id that represents a single state of a homematic device.
 */
export class HmStateId implements StateId {

    private readonly _deviceId: DeviceId;

    private readonly _channel: number;

    private readonly _state: string;

    /**
     * Creates a new state id.
     * @param deviceId The {@link DeviceId} of the device that
     *  contains the state.
     * @param channel The chanel of the state.
     * @param state The name of the state.
     */
    constructor(deviceId: DeviceId, channel: number, state: string) {
        if (!deviceId) {
            throw new Error('deviceId may not be null or undefined');
        }
        if (channel < 0) {
            throw new Error('channel may not be negative');
        }
        if (!state) {
            throw new Error('state may not be null, undefined or empty');
        }
        this._deviceId = deviceId;
        this._channel = channel;
        this._state = state;
    }

    /**
     * Gets the channel.
     * @return Channel number (>= 0).
     */
    public get channel(): number {
        return this._channel;
    }

    /**
     * Gets the {@link DeviceId} of the state.
     * @return The device id.
     */
    public get deviceId(): DeviceId {
        return this._deviceId;
    }

    /**
     * Gets the name of the state.
     * @return Name as a string.
     */
    public get state(): string {
        return this._state;
    }

    /**
     * Gets the full id of the state including the device id.
     * @return The full state id as a string.
     */
    public get(): string {
        return `${this.deviceId.get()}.${this.channel}.${this.state}`;
    }
}
