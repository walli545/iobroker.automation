import {StateId} from '../devices/StateId';

export interface StateService {
    getState(id: StateId): Promise<ioBroker.State>;

    setState(id: StateId, state: string | number | boolean): void;

    getValue<T = number | boolean | string>(id: StateId): Promise<T>;
}
