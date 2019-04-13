import {expect} from 'chai';
import {HmDeviceId} from './HmDeviceId';
import {HmStateId} from './HmStateId';

describe('HmStateId', () => {
    describe('ctor', () => {
        it('should create', () => {
            const devId = new HmDeviceId('NEQ1100467');
            const id = new HmStateId(devId, 2, 'ORIENTATION');
            expect(id.channel).to.equal(2);
            expect(id.state).to.equal('ORIENTATION');
            expect(id.deviceId).to.equal(devId);
        });
        it('should throw when deviceId is null/undefined', () => {
            // @ts-ignore
            expect(() => new HmStateId(undefined, 0, 'LEVEL')).to.throw();
            // @ts-ignore
            expect(() => new HmStateId(null, 0, 'LEVEL')).to.throw();
        });
        it('should throw when channel is negative', () => {
            expect(() => new HmStateId(new HmDeviceId('NEQ1100467'), -1, 'LEVEL')).to.throw();
            expect(() => new HmStateId(new HmDeviceId('NEQ1100467'), -10, 'LEVEL')).to.throw();
        });
        it('should throw when state is empty', () => {
            expect(() => new HmStateId(new HmDeviceId('NEQ1100467'), 0, '')).to.throw();
        });
        it('should throw when state is null/undefined', () => {
            // @ts-ignore
            expect(() => new HmStateId(new HmDeviceId(NEQ1100467), 5, undefined)).to.throw();
            // @ts-ignore
            expect(() => new HmStateId(new HmDeviceId(NEQ1100467), 5, null)).to.throw();
        });
    });

    describe('get', () => {
        [
            {id: new HmDeviceId('NEQ1100467'), channel: 0, state: 'LEVEL'},
            {id: new HmDeviceId('NEQ1100467'), channel: 2, state: 'ORIENTATION'},
            {id: new HmDeviceId('NEQ1100467'), channel: 5, state: 'TEMPERATURE'},
        ].forEach(e => {
            it('should build state id correctly', () => {
                const id = new HmStateId(e.id, e.channel, e.state);
                expect(id.get()).to.equal(`${e.id.get()}.${e.channel}.${e.state}`);
            });
        });
    });
});
