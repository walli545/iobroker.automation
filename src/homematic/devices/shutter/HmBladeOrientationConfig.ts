import {BladeOrientation} from '../../../interfaces/devices/shutter/BladeOrientation';
import {BladeOrientationConfig} from '../../../interfaces/devices/shutter/BladeOrientationConfig';

/**
 * Configuration for a {@link HmBlind} that defines how the blind's blades
 * change orientation.
 */
export class HmBladeOrientationConfig implements BladeOrientationConfig {
    private readonly _resetPercentage: number;

    private readonly _afterResetDelay: number;

    private readonly orientationToMovement = new Map<BladeOrientation, number>();

    constructor(resetPercentage: number, afterResetDelay: number) {
        this._resetPercentage = resetPercentage;
        if (afterResetDelay < 0) {
            throw new Error('afterResetDelay may not be negative!');
        }
        this._afterResetDelay = afterResetDelay;
    }

    /**
     * Percentage the blind needs to move to reset.
     * Can be positive or negative.
     */
    public get ResetPercentage() {
        return this._resetPercentage;
    }

    /**
     * Time in ms that the blind needs to execute reset command.
     */
    public get AfterResetDelay() {
        return this._afterResetDelay;
    }

    /**
     * Gets the relative movement required from reset position to be at the given orientation.
     * @param orientation Orientation to get relative movement for.
     * @returns Relative movement required to occupy the given orientation.
     */
    public getRelativeMovement(orientation: BladeOrientation): number {
        return this.orientationToMovement.get(orientation) as number;
    }

    /**
     * Adds the relative movement required from reset position to be at the given orientation.
     * @param orientation Orientation the relative movement is for.
     * @param movement Relative movement required to execute in order to occupy the given orientation.
     * @return this.
     */
    public addRelativeMovement(orientation: BladeOrientation, movement: number): BladeOrientationConfig {
        if (!this.orientationToMovement.get(orientation)) {
            this.orientationToMovement.set(orientation, movement);
        }
        return this;
    }
}
