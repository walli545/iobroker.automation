import {expect} from 'chai';
import {HmDeviceId} from './HmDeviceId';

describe('HmDeviceId', () => {
    describe('ctor', () => {
        it('should create with default values', () => {
            const id = new HmDeviceId();
            expect(id.instance).to.equal(0);
            expect(id.adapter).to.equal('hm-rpc');
        });
        it('should create with custom values', () => {
            const id = new HmDeviceId('javascript', 2);
            expect(id.instance).to.equal(2);
            expect(id.adapter).to.equal('javascript');
        });
        it('should throw when adapter is null/undefined', () => {
            // @ts-ignore
            expect(() => new HmDeviceId('')).to.throw();
        });
        it('should throw when instance is negative', () => {
            expect(() => new HmDeviceId('hm-rpc', -1)).to.throw();
            expect(() => new HmDeviceId('hm-rpc', -10)).to.throw();
        });
    });

    describe('get', () => {
        [
            {adapter: 'hm-rpc', instance: 0},
            {adapter: 'javascript', instance: 5},
        ].forEach(e => {
            it('should build device id correctly', () => {
                const id = new HmDeviceId(e.adapter, e.instance);
                expect(id.get()).to.equal(`${e.adapter}.${e.instance}`);
            });
        });
    });
});
