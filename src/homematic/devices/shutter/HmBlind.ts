import {DeviceId} from '../../../interfaces/devices/DeviceId';
import {BladeOrientation} from '../../../interfaces/devices/shutter/BladeOrientation';
import {BladeOrientationConfig} from '../../../interfaces/devices/shutter/BladeOrientationConfig';
import {State} from '../../../interfaces/devices/State';
import {StateId} from '../../../interfaces/devices/StateId';
import {StateSubscriber} from '../../../interfaces/devices/StateSubscriber';
import {StateService} from '../../../interfaces/services/StateService';
import {HmBlindStateIds} from './HmBlindStateIds';
import {HmRollerShutter} from './HmRollerShutter';

/**
 * A homematic blind that, in addition to {@link HmRollerShutter},
 * can rotate it's blades.
 */
export class HmBlind extends HmRollerShutter implements StateSubscriber {

    private readonly orientationConfig: BladeOrientationConfig;

    /**
     * Creates a new {@link HmBlind}.
     * @param id {@link DeviceId} of the blind.
     * @param room Room where the device is located.
     * @param stateService {@link StateService} to use to retrieve it's state values.
     *        from.
     * @param ids State ids.
     * @param orientationConfig Contains required configuration for this blind to
     *        change {@link BladeOrientation}.
     */
    constructor(id: DeviceId,
                room: string,
                stateService: StateService,
                ids: HmBlindStateIds,
                orientationConfig: BladeOrientationConfig) {
        super(id, room, stateService, ids);

        this.orientationConfig = orientationConfig;

        this.stateService.register(this);
    }

    /**
     * Sets the blade's orientation.
     * @param orientation New orientation.
     * @param delay Optional delay in ms.
     */
    public setBladeOrientation(orientation: BladeOrientation, delay: number = 0): void {
        this.stateService.setState((this.getIds() as HmBlindStateIds).orientation, orientation, delay);
    }

    /**
     * Gets the blade's current orientation.
     * @return Blade orientation.
     */
    public getBladeOrientation(): Promise<BladeOrientation> {
        return this.stateService.getValue((this.getIds() as HmBlindStateIds).orientation);
    }

    /**
     * Gets the states the blade subscribes to.
     * @return {@link StateId} array of subscribed states.
     */
    public subscribedStates(): StateId[] {
        return [
            this.getIds().moving,
            (this.getIds() as HmBlindStateIds).orientation,
        ];
    }

    /**
     * Handles state change events.
     * @param id StateId of the changed state.
     * @param state Changed state.
     */
    public async on(id: StateId, state: State): Promise<void> {
        const ids = this.getIds() as HmBlindStateIds;

        switch (id) {
            case ids.moving:
                await this.onMoving(state.val as boolean);
                break;
            case ids.orientation:
                await this.onOrientation(state.val as BladeOrientation);
                break;
        }
    }

    private async onMoving(moving: boolean) {
        if (moving) {
            this.setLastLevel(await this.getLevel());
        } else {
            const oldLevel = await this.getLastLevel();
            const newLevel = await this.getLevel();

            const diff: number = newLevel - oldLevel; // > 0: upwards    < 0: downwards

            if (Math.abs(diff) >= 10 && newLevel !== this.MAX_LEVEL) {
                this.setBladeOrientation(BladeOrientation.Flat, 500);
            }
        }
    }

    private async onOrientation(orientation: BladeOrientation) {
        const level = await this.getLevel();

        let nextLevel = this.orientationConfig.getRelativeMovement(orientation);
        let delay = this.orientationConfig.AfterResetDelay;

        if (level > Math.abs(this.orientationConfig.ResetPercentage)) {
            await this.moveRelative(this.orientationConfig.ResetPercentage);
            nextLevel += this.orientationConfig.ResetPercentage;
            nextLevel += level;
        } else if (level !== this.MIN_LEVEL) {
            await this.moveDown();          // Move completely down when level < resetPercentage
        } else {
            delay = 0;                      // Can move directly down
        }

        await this.setLevel(nextLevel, delay);
    }

    private getLastLevel(): Promise<number> {
        return this.stateService.getValue((this.getIds() as HmBlindStateIds).lastLevel);
    }

    private setLastLevel(level: number): void {
        this.stateService.setState((this.getIds() as HmBlindStateIds).lastLevel, level);
    }
}
