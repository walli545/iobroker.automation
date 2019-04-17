import {expect} from 'chai';
import {HmDeviceId} from '../../../src/homematic/devices/HmDeviceId';

describe('HmDeviceId', () => {
    describe('ctor', () => {
        it('should create with default values', () => {
            const id = new HmDeviceId('NEQ1100467');
            expect(id.instance).to.equal(0);
            expect(id.adapter).to.equal('hm-rpc');
            expect(id.name).to.equal('NEQ1100467');
        });
        it('should create with custom values', () => {
            const id = new HmDeviceId('NEQ1100467', 'javascript', 2);
            expect(id.instance).to.equal(2);
            expect(id.adapter).to.equal('javascript');
            expect(id.name).to.equal('NEQ1100467');
        });
        it('should throw when adapter is empty', () => {
            // @ts-ignore
            expect(() => new HmDeviceId(NEQ1100467, '')).to.throw();
        });
        it('should throw when instance is negative', () => {
            expect(() => new HmDeviceId('NEQ1100467', 'hm-rpc', -1)).to.throw();
            expect(() => new HmDeviceId('NEQ1100467', 'hm-rpc', -10)).to.throw();
        });
        it('should throw when name is empty', () => {
            expect(() => new HmDeviceId('', 'hm-rpc', -1)).to.throw();
        });
    });

    describe('get', () => {
        [
            {adapter: 'hm-rpc', instance: 0},
            {adapter: 'javascript', instance: 5},
        ].forEach(e => {
            it('should build device id correctly', () => {
                const id = new HmDeviceId('NEQ1100467', e.adapter, e.instance);
                expect(id.get()).to.equal(`${e.adapter}.${e.instance}.NEQ1100467`);
            });
        });
    });
});
