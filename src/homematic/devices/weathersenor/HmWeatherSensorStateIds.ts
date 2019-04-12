import {StateId} from '../../../interfaces/devices/StateId';
import {WeatherSensorStateIds} from '../../../interfaces/devices/weathersensor/WeatherSensorStateIds';

export class HmWeatherSensorStateIds implements WeatherSensorStateIds {
    private readonly _brightness: StateId;

    private readonly _downfallToday: StateId;

    private readonly _downfallTotal: StateId;

    private readonly _humidity: StateId;

    private readonly _raining: StateId;

    private readonly _temperature: StateId;

    private readonly _windDirection: StateId;

    private readonly _windSpeed: StateId;

    constructor(brightness: StateId,
                downfallToday: StateId,
                downfallTotal: StateId,
                humidity: StateId,
                raining: StateId,
                temperature: StateId,
                windDirection: StateId,
                windSpeed: StateId) {
        this._brightness = brightness;
        this._downfallToday = downfallToday;
        this._downfallTotal = downfallTotal;
        this._humidity = humidity;
        this._raining = raining;
        this._temperature = temperature;
        this._windDirection = windDirection;
        this._windSpeed = windSpeed;
    }

    public get brightness(): StateId {
        return this._brightness;
    }

    public get downfallToday(): StateId {
        return this._downfallToday;
    }

    public get downfallTotal(): StateId {
        return this._downfallTotal;
    }

    public get humidity(): StateId {
        return this._humidity;
    }

    public get raining(): StateId {
        return this._raining;
    }

    public get temperature(): StateId {
        return this._temperature;
    }

    public get windDirection(): StateId {
        return this._windDirection;
    }

    public get windSpeed(): StateId {
        return this._windSpeed;
    }
}
