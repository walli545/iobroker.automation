import {BladeOrientation} from './BladeOrientation';

/**
 * Configuration for a {@link Blind} that defines how the blind's blades
 * change orientation.
 */
export interface BladeOrientationConfig {
    /**
     * Percentage the blind needs to move to reset.
     * Can be positive or negative.
     */
    ResetPercentage: number;

    /**
     * Time the blind needs to execute reset command.
     */
    AfterResetDelay: number;

    /**
     * Gets the relative movement required from reset position to be at the given orientation.
     * @param orientation Orientation to get relative movement for.
     * @returns Relative movement required to occupy the given orientation.
     */
    getRelativeMovement(orientation: BladeOrientation): number;

    /**
     * Adds the relative movement required from reset position to be at the given orientation.
     * @param orientation Orientation the relative movement is for.
     * @param movement Relative movement required to execute in order to occupy the given orientation.
     * @return this.
     */
    addRelativeMovement(orientation: BladeOrientation, movement: number): BladeOrientationConfig;
}
