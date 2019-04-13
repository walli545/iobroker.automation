import {DeviceId} from '../../../interfaces/devices/DeviceId';
import {WeatherSensor} from '../../../interfaces/devices/weathersensor/WeatherSensor';
import {WeatherSensorStateIds} from '../../../interfaces/devices/weathersensor/WeatherSensorStateIds';
import {StateService} from '../../../interfaces/services/StateService';
import {HmDevice} from '../HmDevice';

/**
 * A homematic weather sensor.
 */
export class HmWeatherSensor extends HmDevice implements WeatherSensor {
    private ids: WeatherSensorStateIds;

    constructor(id: DeviceId, room: string, stateService: StateService, ids: WeatherSensorStateIds) {
        super(id, room, stateService);
        this.ids = ids;
    }

    /**
     * Gets the currently measured brightness.
     * @return Brightness from 0 to 255 (255 is brightest).
     */
    public getBrightness(): Promise<number> {
        return this.stateService.getValue(this.ids.brightness);
    }

    /**
     * Gets today's rain amount.
     * @return Rain amount in mm.
     */
    public getDownfallToday(): Promise<number> {
        return this.stateService.getValue(this.ids.downfallToday);
    }

    /**
     * Gets total rain amount.
     * @return Rain amount in mm.
     */
    public getDownfallTotal(): Promise<number> {
        return this.stateService.getValue(this.ids.downfallTotal);
    }

    /**
     * Gets the currently measured humidity.
     * @return Humidity in percent.
     */
    public getHumidity(): Promise<number> {
        return this.stateService.getValue(this.ids.humidity);
    }

    /**
     * Indicates weather it is raining.
     * @return True or false.
     */
    public isRaining(): Promise<boolean> {
        return this.stateService.getValue(this.ids.raining);
    }

    /**
     * Gets the currently measured temperature.
     * @return The temperature in degrees celsius.
     */
    public getTemperature(): Promise<number> {
        return this.stateService.getValue(this.ids.temperature);
    }

    /**
     * Gets the currently measured wind direction.
     * @return The wind direction in degrees (from 0 to 360).
     */
    public getWindDirection(): Promise<number> {
        return this.stateService.getValue(this.ids.windDirection);
    }

    /**
     * Gets the currently measured wind speed.
     * @return The wind speed in kilometer per hour.
     */
    public getWindSpeed(): Promise<number> {
        return this.stateService.getValue(this.ids.windSpeed);
    }
}
