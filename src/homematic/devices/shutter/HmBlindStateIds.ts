import {BlindStateIds} from '../../../interfaces/devices/shutter/BlindStateIds';
import {StateId} from '../../../interfaces/devices/StateId';

export interface HmBlindStateIds extends BlindStateIds {
    lastLevel: StateId;
}
