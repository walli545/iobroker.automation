import {BladeOrientation} from './BladeOrientation';
import {RollerShutter} from './RollerShutter';

/**
 * A blind is like a roller shutter but consists of rotatable blades.
 */
export interface Blind extends RollerShutter {
    /**
     * Sets the orientation of the blades.
     * @param orientation The new orientation.
     * @param delay Delay in ms.
     */
    setBladeOrientation(orientation: BladeOrientation, delay?: number): void;

    /**
     * Gets the current orientation of the blades.
     */
    getBladeOrientation(): Promise<BladeOrientation>;
}
