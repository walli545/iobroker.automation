import {expect} from 'chai';
import {HmBladeOrientationConfig} from '../../../../src/homematic/devices/shutter/HmBladeOrientationConfig';
import {BladeOrientation} from '../../../../src/interfaces/devices/shutter/BladeOrientation';

describe('HmBladeOrientationConfig', function() {
    describe('ctor', function() {
        it('should throw when afterResetDelay is negative', function() {
            expect(() => new HmBladeOrientationConfig(-4, -1)).to.throw();
            expect(() => new HmBladeOrientationConfig(-4, -5)).to.throw();
            expect(() => new HmBladeOrientationConfig(-4, -5_000)).to.throw();
        });

        it('should create', function() {
            const sut = new HmBladeOrientationConfig(-4, 5_000);

            expect(sut.AfterResetDelay).to.equal(5_000);
            expect(sut.ResetPercentage).to.equal(-4);
        });
    });

    describe('getRelativeMovement/addRelativeMovement', function() {
        beforeEach(function() {
            this.sut = new HmBladeOrientationConfig(-5, 5_000);
        });

        it('should return undefined when entry does not exist', function() {
            expect(this.sut.getRelativeMovement(BladeOrientation.Flat)).to.be.undefined;
            expect(this.sut.getRelativeMovement(BladeOrientation.Down)).to.be.undefined;
            expect(this.sut.getRelativeMovement(BladeOrientation.Up)).to.be.undefined;
        });

        it('should add relative movement for Flat', function() {
            this.sut.addRelativeMovement(BladeOrientation.Flat, 1.5);

            expect(this.sut.getRelativeMovement(BladeOrientation.Flat)).to.equal(1.5);
        });

        it('should add relative movement for Up', function() {
            this.sut.addRelativeMovement(BladeOrientation.Up, 5);

            expect(this.sut.getRelativeMovement(BladeOrientation.Up)).to.equal(5);
        });

        it('should add relative movement for Down', function() {
            this.sut.addRelativeMovement(BladeOrientation.Down, -2);

            expect(this.sut.getRelativeMovement(BladeOrientation.Down)).to.equal(-2);
        });

        it('should add relative movement for all', function() {
            this.sut.addRelativeMovement(BladeOrientation.Down, -2).addRelativeMovement(BladeOrientation.Flat, 3.4).addRelativeMovement(BladeOrientation.Up, 2.3);

            expect(this.sut.getRelativeMovement(BladeOrientation.Down)).to.equal(-2);
            expect(this.sut.getRelativeMovement(BladeOrientation.Flat)).to.equal(3.4);
            expect(this.sut.getRelativeMovement(BladeOrientation.Up)).to.equal(2.3);
        });

        it('should not override relative movement', function() {
            this.sut.addRelativeMovement(BladeOrientation.Down, -2);
            this.sut.addRelativeMovement(BladeOrientation.Down, -5);

            expect(this.sut.getRelativeMovement(BladeOrientation.Down)).to.equal(-2);
        });
    });
});
