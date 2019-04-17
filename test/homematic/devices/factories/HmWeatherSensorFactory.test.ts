import {expect} from 'chai';
import {Mock} from 'ts-mockery';
import {HmDeviceId} from '../../../../src/homematic/devices/HmDeviceId';
import {HmWeatherSensorFactory} from '../../../../src/homematic/factories/HmWeatherSensorFactory';
import {WeatherSensor} from '../../../../src/interfaces/devices/weathersensor/WeatherSensor';
import {StateService} from '../../../../src/interfaces/services/StateService';

describe('HmWeatherSensorFactory', () => {
    describe('create', () => {
        it('should return null when deviceId is null', () => {
            const stateService = Mock.of<StateService>();
            const factory = new HmWeatherSensorFactory(stateService);

            factory.id = null;
            factory.room = 'WG';

            expect(factory.create()).to.be.equal(null);
        });

        it('should return null when room is null', () => {
            const stateService = Mock.of<StateService>();
            const factory = new HmWeatherSensorFactory(stateService);

            factory.id = new HmDeviceId('NEQ1100467');
            factory.room = null;

            expect(factory.create()).to.be.equal(null);
        });

        it('should return null when room is empty', () => {
            const stateService = Mock.of<StateService>();
            const factory = new HmWeatherSensorFactory(stateService);

            factory.id = new HmDeviceId('NEQ1100467');
            factory.room = '';

            expect(factory.create()).to.be.equal(null);
        });

        it('should create correct WeatherSensor', () => {
            const stateService = Mock.of<StateService>();
            const factory = new HmWeatherSensorFactory(stateService);
            const id = new HmDeviceId('NEQ1100467', 'hm-rpc', 0);
            factory.id = id;
            factory.room = 'WG';

            const d: WeatherSensor = factory.create() as WeatherSensor;

            expect(d.id).to.be.equal(id);
            expect(d.room).to.be.equal('WG');
        });
    });
});
