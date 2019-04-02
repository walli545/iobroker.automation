import {WeatherSensor} from '../interfaces/WeatherSensor';
import {HmDevice} from './HmDevice';

export class HmWeatherSensor extends HmDevice implements WeatherSensor {

	public async getHumidity(): Promise<number> {
		return (await this.stateService.getState('1.HUMIDITY')).val;
	}

	get temperature(): number {
		return this.stateService.get('1.TEMPERATURE').val;
	}

	get brightness(): number {
		return this.stateService.get('1.BRIGHTNESS').val;
	}

	get windSpeed(): number {
		return this.stateService.get('1.WIND_SPEED').val;
	}

	get windDirection(): number {
		return this.stateService.get('1.WIND_DIRECTION').val;
	}

	get downfallTotal(): number {
		return this.stateService.get('1.RAIN_COUNTER').val;
	}

	get downfallToday(): number {
		return this.stateService.get('Niederschlag2').val;
	}

	get raining(): boolean {
		return this.stateService.get('1.RAINING').val;
	}
}
