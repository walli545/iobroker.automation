import {DeviceId} from '../../interfaces/devices/DeviceId';
import {WeatherSensor} from '../../interfaces/devices/weathersensor/WeatherSensor';
import {DeviceFactory} from '../../interfaces/services/DeviceFactory';
import {IoBrokerId} from '../../iobroker/IoBrokerId';
import {HmStateId} from '../devices/HmStateId';
import {HmWeatherSensor} from '../devices/weathersenor/HmWeatherSensor';
import {HmWeatherSensorStateIds} from '../devices/weathersenor/HmWeatherSensorStateIds';
import {HmDeviceFactory} from './HmDeviceFactory';

/**
 * {@link DeviceFactory} for a homematic weather sensor.
 */
export class HmWeatherSensorFactory extends HmDeviceFactory {

    /**
     * Creates a new homematic weather sensor.
     * @return The created {@link WeatherSensor}. null if some of the configuration
     * parameters where null (id or room).
     */
    public create(): WeatherSensor | null {
        if (this.id && this.room) {
            const id = this.id as DeviceId;
            const room = this.room as string;
            return new HmWeatherSensor(id, room, this.stateService, new HmWeatherSensorStateIds(
                new HmStateId(id, 1, 'BRIGHTNESS'),
                new IoBrokerId('javascript', 0, 'Niederschlag2', 'WeatherSensor'),
                new HmStateId(id, 1, 'RAIN_TOTAL'),
                new HmStateId(id, 1, 'HUMIDITY'),
                new HmStateId(id, 1, 'RAINING'),
                new HmStateId(id, 1, 'TEMPERATURE'),
                new HmStateId(id, 1, 'WIND_DIRECTION'),
                new HmStateId(id, 1, 'WIND_SPEED'),
            ));
        }
        return null;
    }
}
