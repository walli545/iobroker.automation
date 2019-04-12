import {Device} from '../../interfaces/devices/Device';
import {DeviceId} from '../../interfaces/devices/DeviceId';
import {DeviceFactory} from '../../interfaces/services/DeviceFactory';
import {StateService} from '../../interfaces/services/StateService';

/**
 * Source abstract {@link DeviceFactory} to create homematic devices.
 */
export abstract class HmDeviceFactory implements DeviceFactory {
    private _id: DeviceId | null;

    private _room: string | null;

    private readonly _stateService: StateService;

    /**
     * Creates a new homematic device factory.
     * @param stateService The {@link StateService} the device uses to retrieve its state values.
     */
    constructor(stateService: StateService) {
        this._id = null;
        this._room = null;
        this._stateService = stateService;
    }

    /**
     * Gets the room where the device to be created is located.
     */
    public get room(): string | null {
        return this._room;
    }

    /**
     * Sets the room where the device to be created is located.
     * @param value Room as string.
     */
    public set room(value: string | null) {
        this._room = value;
    }

    /**
     * Gets the {@link DeviceId} of the device to be created.
     */
    public get id(): DeviceId | null {
        return this._id;
    }

    /**
     * Sets the {@link DeviceId} of the device to be created.
     * @param value DeviceId.
     */
    public set id(value: DeviceId | null) {
        this._id = value;
    }

    protected get stateService(): StateService {
        return this._stateService;
    }

    /**
     * Creates a new device with the given configuration.
     * @return The created {@link Device}. null if some of the configuration
     * parameters where null (id or room).
     */
    public abstract create(): Device | null;
}
