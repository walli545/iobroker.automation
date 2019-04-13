import {expect} from 'chai';
import {Mock} from 'ts-mockery';
import {DeviceId} from '../../../interfaces/devices/DeviceId';
import {WeatherSensor} from '../../../interfaces/devices/weathersensor/WeatherSensor';
import {WeatherSensorStateIds} from '../../../interfaces/devices/weathersensor/WeatherSensorStateIds';
import {StateService} from '../../../interfaces/services/StateService';
import {HmDeviceId} from '../HmDeviceId';
import {HmStateId} from '../HmStateId';
import {HmWeatherSensor} from './HmWeatherSensor';
import sinon = require('sinon');

describe('HmWeatherSensor', () => {

    let ids: WeatherSensorStateIds;
    let id: DeviceId;

    beforeEach(() => {
        id = new HmDeviceId('NEQ1100467');
        ids = {
            brightness: new HmStateId(id, 1, 'BRIGHTNESS'),
            downfallTotal: new HmStateId(id, 1, 'RAIN_TOTAL'),
            windDirection: new HmStateId(id, 1, 'WIND_DIRECTION'),
            windSpeed: new HmStateId(id, 1, 'WIND_SPEED'),
            temperature: new HmStateId(id, 1, 'TEMPERATURE'),
            raining: new HmStateId(id, 1, 'RAINING'),
            humidity: new HmStateId(id, 1, 'HUMIDITY'),
            downfallToday: new HmStateId(id, 1, 'RAIN_TODAY'),
        };
    });

    describe('ctor', () => {

        it('should create', () => {
            const service = Mock.of<StateService>();
            const ws = new HmWeatherSensor(id, 'room', service, ids);
            expect(ws.id.get()).to.equal(id.get());
            expect(ws.room).to.equal('room');
        });
    });

    describe('getter', () => {
        let service: StateService;
        let ws: WeatherSensor;
        let v: number | boolean = 5;

        beforeEach(() => {
            service = Mock.of<StateService>({getValue: () => Promise.resolve(v)});
            ws = new HmWeatherSensor(id, 'room', service, ids);
        });

        it('should get brightness', async () => {
            const spy = sinon.spy(service, 'getValue');
            const value = await ws.getBrightness();
            expect(value).to.equal(v);
            sinon.assert.calledWith(spy, ids.brightness);
        });

        it('should get downfallToday', async () => {
            v = 10;
            const spy = sinon.spy(service, 'getValue');
            const value = await ws.getDownfallToday();
            expect(value).to.equal(v);
            sinon.assert.calledWith(spy, ids.downfallToday);
        });

        it('should get downFallTotal', async () => {
            v = 0;
            const spy = sinon.spy(service, 'getValue');
            const value = await ws.getDownfallTotal();
            expect(value).to.equal(v);
            sinon.assert.calledWith(spy, ids.downfallTotal);
        });

        it('should get humidity', async () => {
            v = 11;
            const spy = sinon.spy(service, 'getValue');
            const value = await ws.getHumidity();
            expect(value).to.equal(v);
            sinon.assert.calledWith(spy, ids.humidity);
        });

        it('should get raining', async () => {
            v = true;
            const spy = sinon.spy(service, 'getValue');
            const value = await ws.isRaining();
            expect(value).to.equal(v);
            sinon.assert.calledWith(spy, ids.raining);
        });

        it('should get temperature', async () => {
            v = 99;
            const spy = sinon.spy(service, 'getValue');
            const value = await ws.getTemperature();
            expect(value).to.equal(v);
            sinon.assert.calledWith(spy, ids.temperature);
        });

        it('should get windSpeed', async () => {
            const want = 20;
            const fake = sinon.fake.resolves(want);
            sinon.replace(service, 'getValue', fake);

            const value = await ws.getWindSpeed();
            expect(value).to.equal(want);
        });

        it('should get windDirection', async () => {
            v = 5;
            const spy = sinon.spy(service, 'getValue');
            const value = await ws.getWindDirection();
            expect(value).to.equal(v);
            sinon.assert.calledWith(spy, ids.windDirection);
        });
    });
});
