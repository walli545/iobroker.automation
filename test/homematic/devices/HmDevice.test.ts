import {expect} from 'chai';
import {Mock} from 'ts-mockery';
import {HmDevice} from '../../../src/homematic/devices/HmDevice';
import {HmDeviceId} from '../../../src/homematic/devices/HmDeviceId';
import {DeviceId} from '../../../src/interfaces/devices/DeviceId';
import {StateService} from '../../../src/interfaces/services/StateService';

describe('HmDevice', () => {
    describe('ctor', () => {

        it('should create', () => {
            const stateService = Mock.of<StateService>();
            const id = new HmDeviceId('NEQ1100467');
            const room = 'WG';

            const dev = new HmDeviceImplementation(id, room, stateService);

            expect(dev.room).to.equal(room);
            expect(dev.id).to.equal(id);
        });

        it('should throw when deviceId is null/undefined', () => {
            const stateService = Mock.of<StateService>();

            // @ts-ignore
            expect(() => new HmDeviceImplementation(undefined, 'room', stateService)).to.throw();

            // @ts-ignore
            expect(() => new HmDeviceImplementation(null, 'room', stateService)).to.throw();
        });

        it('should throw when room is null/undefined', () => {
            const stateService = Mock.of<StateService>();
            // @ts-ignore
            expect(() => new HmDeviceImplementation(new HmDeviceId('name'), undefined, stateService)).to.throw();

            // @ts-ignore
            expect(() => new HmDeviceImplementation(new HmDeviceId('name'), null, stateService)).to.throw();
        });

        it('should throw when room is empty', () => {
            const stateService = Mock.of<StateService>();
            // @ts-ignore
            expect(() => new HmDeviceImplementation(new HmDeviceId('name'), '', stateService)).to.throw();
        });

        it('should throw when stateService is null/undefined', () => {
            // @ts-ignore
            expect(() => new HmDeviceImplementation(new HmDeviceId('name'), 'room', undefined)).to.throw();

            // @ts-ignore
            expect(() => new HmDeviceImplementation(new HmDeviceId('name'), 'room', null)).to.throw();
        });
    });
});

class HmDeviceImplementation extends HmDevice {
    constructor(id: DeviceId, room: string, protected readonly stateService: StateService) {
        super(id, room, stateService);
    }
}
