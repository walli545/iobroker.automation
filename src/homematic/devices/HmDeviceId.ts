import {DeviceId} from '../../interfaces/devices/DeviceId';

/**
 * An id that is used by homematic devices.
 */
export class HmDeviceId implements DeviceId {

    private readonly _adapter: string;

    private readonly _instance: number;

    /**
     * Creates a new device id.
     * @param adapter The adapter used in ioBroker.
     * @param instance The instance number in ioBroker.
     */
    constructor(adapter: string = 'hm-rpc', instance: number = 0) {
        if (!adapter) {
            throw new Error('adapter may not be empty, null or undefined');
        }
        if (instance < 0) {
            throw new Error('instance may not be negative');
        }
        this._adapter = adapter;
        this._instance = instance;
    }

    /**
     * Gets the adapter name where the device is located.
     * @return Adapter name.
     */
    public get adapter(): string {
        return this._adapter;
    }

    /**
     * Gets the instance number where the device is located.
     * @return Instance number (>= 0).
     */
    public get instance(): number {
        return this._instance;
    }

    /**
     * Gets the full id of the device.
     * @return Full id as string.
     */
    public get(): string {
        return `${this.adapter}.${this.instance}`;
    }
}
