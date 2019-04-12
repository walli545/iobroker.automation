import {expect} from 'chai';
import {IoBrokerId} from './IoBrokerId';

describe('IoBroker: StateId', () => {
    describe('get', () => {

        [
            ['123'],
            ['123', '123'],
            ['onepath', 'sEcondPath', 'thirdPath', '123'],
        ].forEach(p => {
            it(`should build with ${p.length} paths `, () => {
                const id = new IoBrokerId('hm-rpc', 0, 'LEVEL', ...p);
                expect(id.get()).to.equal(`hm-rpc.0.${p.join('.')}.LEVEL`);
            });
        });
        it('should build without path', () => {
            const id = new IoBrokerId('hm-rpc', 0, 'LEVEL');
            expect(id.get()).to.equal('hm-rpc.0.LEVEL');
        });

        it('should throw when adapter is empty', () => {
            expect(() => new IoBrokerId('', 0, 'LEVEL')).to.throw();
        });

        it('should throw when state is empty', () => {
            expect(() => new IoBrokerId('hm-rpc', 0, '')).to.throw();
        });

        it('should throw when instance is negative', () => {
            expect(() => new IoBrokerId('hm-rpc', -1, 'LEVEL')).to.throw();
            expect(() => new IoBrokerId('hm-rpc', -5, 'LEVEL')).to.throw();
        });
    });
});
