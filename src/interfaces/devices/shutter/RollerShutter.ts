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
    setLevel(level: number, delay: number): void;

    /**
     * Moves the shutter completely up.
     * @return True if the shutter moved.
     */
    moveUp(): boolean;

    /**
     * Moves the shutter completely down.
     * @return True if the shutter moved.
     */
    moveDown(): boolean;
}
