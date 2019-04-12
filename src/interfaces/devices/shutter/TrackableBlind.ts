import {Blind} from './Blind';

/**
 * A blind that tracks it's last state and can decide
 * whether it moved down or up.
 */
export interface TrackableBlind extends Blind {
    /**
     * Gets the last level of the blind.
     * @return Last level in percent (0-100).
     */
    getLastLevel(): Promise<number>;

    /**
     * Sets the last level.
     * @param level The new last level in percent (0-100).
     */
    setLastLevel(level: number): void;

    /**
     * Indicates whether the blind moved down.
     * @return True if the blinds last move was downwards.
     */
    movedDown(): Promise<boolean>;
}
