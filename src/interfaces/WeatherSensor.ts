export interface WeatherSensor {
	humidity: number;

	temperature: number;

	brightness: number;

	windSpeed: number;

	windDirection: number;

	downfallToday: number;

	downfallTotal: number;

	raining: boolean;
}
