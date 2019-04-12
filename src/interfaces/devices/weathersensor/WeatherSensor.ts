import {Device} from '../Device';

/**
 * Source weather sensor.
 */
export interface WeatherSensor extends Device {
    /**
     * Gets total rain amount.
     * @return Rain amount in mm.
     */
    getBrightness(): Promise<number>;

    /**
     * Gets total rain amount.
     * @return Rain amount in mm.
     */
    getDownfallTotal(): Promise<number>;

    /**
     * Gets today's rain amount.
     * @return Rain amount in mm.
     */
    getDownfallToday(): Promise<number>;

    /**
     * Gets the currently measured humidity.
     * @return Humidity in percent.
     */
    getHumidity(): Promise<number>;

    /**
     * Gets the currently measured temperature.
     * @return The temperature in degrees celsius.
     */
    getTemperature(): Promise<number>;

    /**
     * Gets the currently measured wind direction.
     * @return The wind direction in degrees (from 0 to 360).
     */
    getWindDirection(): Promise<number>;

    /**
     * Gets the currently measured wind speed.
     * @return The wind speed in kilometer per hour.
     */
    getWindSpeed(): Promise<number>;

    /**
     * Indicates weather it is raining.
     * @return True or false.
     */
    isRaining(): Promise<boolean>;
}
