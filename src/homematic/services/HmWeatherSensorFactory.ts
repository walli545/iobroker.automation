import {DeviceId} from '../../interfaces/devices/DeviceId';
import {WeatherSensor} from '../../interfaces/devices/weathersensor/WeatherSensor';
import {WeatherSensorStateIds} from '../../interfaces/devices/weathersensor/WeatherSensorStateIds';
import {DeviceFactory} from '../../interfaces/services/DeviceFactory';
import {IoBrokerId} from '../../iobroker/IoBrokerId';
import {HmStateId} from '../devices/HmStateId';
import {HmWeatherSensor} from '../devices/weathersenor/HmWeatherSensor';
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
            const ids: WeatherSensorStateIds = {
                brightness: new HmStateId(id, 1, 'BRIGHTNESS'),
                downfallTotal: new HmStateId(id, 1, 'RAIN_TOTAL'),
                windDirection: new HmStateId(id, 1, 'WIND_DIRECTION'),
                windSpeed: new HmStateId(id, 1, 'WIND_SPEED'),
                temperature: new HmStateId(id, 1, 'TEMPERATURE'),
                raining: new HmStateId(id, 1, 'RAINING'),
                humidity: new HmStateId(id, 1, 'HUMIDITY'),
                downfallToday: new IoBrokerId('javascript', 0, 'Niederschlag2', 'WeatherSensor'),
            };
            return new HmWeatherSensor(id, room, this.stateService, ids);
        }
        return null;
    }
}
