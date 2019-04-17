import {State} from './State';
import {StateId} from './StateId';

/**
 * Marks a device as a subscriber to state changes.
 */
export interface StateSubscriber {
    /**
     * Triggers when one of the subscribed states changes.
     * @param id {@link StateId} of the changed state.
     * @param state Changed state data.
     */
    on(id: StateId, state: State): void;

    /**
     * The states the device is subscribed to.
     * @return Array of states the device wants to subscribe to.
     */
    subscribedStates(): StateId[];
}
