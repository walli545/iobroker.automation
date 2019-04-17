import {StateId} from '../StateId';
import {BlindStateIds} from './BlindStateIds';

export interface TrackableBlindStateIds extends BlindStateIds {
    lastLevel: StateId;
}
