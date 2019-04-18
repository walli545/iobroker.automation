import {DeviceId} from '../../../interfaces/devices/DeviceId';
import {RollerShutter} from '../../../interfaces/devices/shutter/RollerShutter';
import {RollerShutterStateIds} from '../../../interfaces/devices/shutter/RollerShutterStateIds';
import {StateService} from '../../../interfaces/services/StateService';
import {HmDevice} from '../HmDevice';

/**
 * A homematic roller shutter.
 */
export class HmRollerShutter extends HmDevice implements RollerShutter {

    private readonly ids: RollerShutterStateIds;

    /**
     * Max level of the shutter. Shutter is fully open.
     */
    protected readonly MAX_LEVEL = 100;

    /**
     * Min level of the shutter. Shutter is fully closed.
     */
    protected readonly MIN_LEVEL = 0;

    constructor(id: DeviceId, room: string, stateService: StateService, ids: RollerShutterStateIds) {
        super(id, room, stateService);
        if (!ids) {
            throw new Error('ids may not be null/undefined');
        }
        this.ids = ids;
    }

    protected getIds(): RollerShutterStateIds {
        return this.ids;
    }

    /**
     * Gets the current level of the shutter.
     * @return Current level in percent.
     */
    public getLevel(): Promise<number> {
        return this.stateService.getValue(this.ids.level);
    }

    /**
     * Moves the shutter to a specific level.
     * @param level The new level of the shutter.
     * @param delay Delay in ms after which the shutter should move.
     */
    public setLevel(level: number, delay: number = 0): void {
        if (level < this.MIN_LEVEL || level > this.MAX_LEVEL) {
            throw new Error('level must be between 0 and 100');
        }
        if (delay < 0) {
            throw new Error('delay may not be negative');
        }
        this.stateService.setState(this.ids.level, level, delay);
    }

    /**
     * Moves the shutter downwards.
     * @param delay Delay in ms.
     * @return True if the shutter actually needed movement.
     */
    public async moveDown(delay: number = 0): Promise<boolean> {
        let moved = false;
        const level = await this.getLevel();
        if (level !== this.MIN_LEVEL) {
            this.setLevel(this.MIN_LEVEL, delay);
            moved = true;
        }
        return Promise.resolve(moved);
    }

    /**
     * Moves the shutter upwards.
     * @param delay Delay in ms.
     * @return True if the shutter actually needed movement.
     */
    public async moveUp(delay: number = 0): Promise<boolean> {
        let moved = false;
        const level = await this.getLevel();
        if (level !== this.MAX_LEVEL) {
            this.setLevel(this.MAX_LEVEL, delay);
            moved = true;
        }
        return Promise.resolve(moved);
    }

    /**
     * Moves the shutter by a relative amount.
     * @param relativeLevel Level to move in percent.
     * @param delay Delay in ms.
     */
    public async moveRelative(relativeLevel: number, delay: number = 0): Promise<void> {
        const currentLevel = await this.getLevel();

        if (currentLevel + relativeLevel >= this.MAX_LEVEL) {
            await this.moveUp(delay);
        } else if (currentLevel + relativeLevel <= this.MIN_LEVEL) {
            await this.moveDown(delay);
        } else {
            this.setLevel(currentLevel + relativeLevel, delay);
        }
    }

    /**
     * Indicates whether the shutter is moving at the moment.
     * @return True if the shutter is moving.
     */
    public isMoving(): Promise<boolean> {
        return this.stateService.getValue(this.ids.moving);
    }
}
