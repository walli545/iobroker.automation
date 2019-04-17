import {StateId} from '../devices/StateId';
import {StateSubscriber} from '../devices/StateSubscriber';

export interface StateService {
    getState(id: StateId): Promise<ioBroker.State>;

    setState(id: StateId, state: string | number | boolean, delay?: number): void;

    getValue<T = number | boolean | string>(id: StateId): Promise<T>;

    register(tracker: StateSubscriber): void;

    unregister(tracker: StateSubscriber): void;
}
