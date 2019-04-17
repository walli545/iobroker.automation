import {Device} from '../Device';

/**
 * A simple roller shutter that can be moved up and down.
 */
export interface RollerShutter extends Device {
    /**
     * Current level of the shutter.
     * @return Level in percent (0-100).
     */
    getLevel(): Promise<number>;

    /**
     * Sets the level of the shutter.
     * @param level New level in percent.
     * @param delay Optional delay in ms.
     */
    setLevel(level: number, delay?: number): void;

    /**
     * Moves the shutter completely up.
     * @param delay Delay in ms.
     * @return True if the shutter moved.
     */
    moveUp(delay?: number): Promise<boolean>;

    /**
     * Moves the shutter completely down.
     * @param delay Delay in ms.
     * @return True if the shutter moved.
     */
    moveDown(delay?: number): Promise<boolean>;

    /**
     * Moves the shutter by a relative amount.
     * @param relativeLevel Level in percent. Positive values move the
     *        shutter downwards, negative upwards.
     * @param delay Delay in ms.
     */
    moveRelative(relativeLevel: number, delay?: number): void;

    /**
     * Indicates whether the shutter is moving at the moment.
     */
    isMoving(): Promise<boolean>;
}
