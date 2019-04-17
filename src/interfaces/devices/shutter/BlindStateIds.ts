import {StateId} from '../StateId';
import {RollerShutterStateIds} from './RollerShutterStateIds';

export interface BlindStateIds extends RollerShutterStateIds {
    orientation: StateId;
}
