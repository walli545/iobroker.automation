import {expect} from 'chai';
import sinon = require('sinon');
import {Mock} from 'ts-mockery';
import {HmDeviceId} from '../../../../src/homematic/devices/HmDeviceId';
import {HmStateId} from '../../../../src/homematic/devices/HmStateId';
import {HmRollerShutter} from '../../../../src/homematic/devices/shutter/HmRollerShutter';
import {RollerShutterStateIds} from '../../../../src/interfaces/devices/shutter/RollerShutterStateIds';
import {StateService} from '../../../../src/interfaces/services/StateService';

export function executeHmRollerShutterTests() {

    describe('getter', function() {

        it('should get isMoving', async function() {
            const stub = sinon.stub().resolves(true);
            this.stateService.getValue = stub;
            const value = await this.sut.isMoving();
            expect(value).to.equal(true);
            sinon.assert.calledWith(stub, this.ids.moving);
        });

        it('should get level', async function() {
            const stub = sinon.stub().resolves(50);
            this.stateService.getValue = stub;
            const value = await this.sut.getLevel();
            expect(value).to.equal(50);
            sinon.assert.calledWith(stub, this.ids.level);
        });
    });

    describe('setLevel', function() {

        it('should throw when level is negative', function() {
            const spy = sinon.spy(this.stateService, 'setState');
            expect(() => this.sut.setLevel(-1)).to.throw();
            expect(() => this.sut.setLevel(-10)).to.throw();
            sinon.assert.notCalled(spy);
        });

        it('should throw when level is greater than 100', function() {
            const spy = sinon.spy(this.stateService, 'setState');
            expect(() => this.sut.setLevel(101)).to.throw();
            expect(() => this.sut.setLevel(200)).to.throw();
            sinon.assert.notCalled(spy);
        });

        it('should throw when delay is negative', function() {
            const spy = sinon.spy(this.stateService, 'setState');
            expect(() => this.sut.setLevel(50, -1)).to.throw();
            expect(() => this.sut.setLevel(50, -10)).to.throw();
            sinon.assert.notCalled(spy);
        });

        it('should set level to 0', function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.sut.setLevel(0, 0);
            sinon.assert.calledWith(spy, this.ids.level, 0, 0);
        });

        it('should set level to 50', function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.sut.setLevel(50, 0);
            sinon.assert.calledWith(spy, this.ids.level, 50, 0);
        });

        it('should set level to 100', function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.sut.setLevel(100, 0);
            sinon.assert.calledWith(spy, this.ids.level, 100, 0);
        });

        it('should set level delayed', function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.sut.setLevel(100, 1_000);
            sinon.assert.calledWith(spy, this.ids.level, 100, 1_000);
        });
    });

    describe('moveRelative', function() {

        it('should move 10% up when level at 0', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(0);

            await this.sut.moveRelative(10);

            sinon.assert.calledWith(spy, this.ids.level, 10, 0);
        });

        it('should move 30% up when level at 50', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(50);

            await this.sut.moveRelative(30);

            sinon.assert.calledWith(spy, this.ids.level, 80, 0);
        });

        it('should move 30% down when level at 50', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(50);

            await this.sut.moveRelative(-30);

            sinon.assert.calledWith(spy, this.ids.level, 20, 0);
        });

        it('should move to 0 when level at 20 and relativeLevel is to much', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(20);

            await this.sut.moveRelative(-50);

            sinon.assert.calledWith(spy, this.ids.level, 0, 0);
        });

        it('should move to 100 when level at 80 and relativeLevel is to much', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(80);

            await this.sut.moveRelative(50);

            sinon.assert.calledWith(spy, this.ids.level, 100, 0);
        });

        it('should move delayed by 10%', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(80);

            await this.sut.moveRelative(20, 1_000);

            sinon.assert.calledWith(spy, this.ids.level, 100, 1_000);
        });
    });

    describe('moveDown', function() {
        it('should move down when level at 100', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(100);

            const moved = await this.sut.moveDown();

            expect(moved).to.be.true;
            sinon.assert.calledWith(spy, this.ids.level, 0, 0);
        });

        it('should move down when level at 50', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(50);

            const moved = await this.sut.moveDown();

            expect(moved).to.be.true;
            sinon.assert.calledWith(spy, this.ids.level, 0, 0);
        });

        it('should not move down when level at 0', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(0);

            const moved = await this.sut.moveDown();

            expect(moved).to.be.false;
            sinon.assert.notCalled(spy);
        });

        it('should move down delayed', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(50);

            const moved = await this.sut.moveDown(1000);

            expect(moved).to.be.true;
            sinon.assert.calledWith(spy, this.ids.level, 0, 1000);
        });
    });

    describe('moveUp', () => {

        it('should move up when level at 0', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(0);

            const moved = await this.sut.moveUp();

            expect(moved).to.be.true;
            sinon.assert.calledWith(spy, this.ids.level, 100, 0);
        });

        it('should move up when level at 50', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(50);

            const moved = await this.sut.moveUp();

            expect(moved).to.be.true;
            sinon.assert.calledWith(spy, this.ids.level, 100, 0);
        });

        it('should not move down when level at 100', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(100);

            const moved = await this.sut.moveUp();

            expect(moved).to.be.false;
            sinon.assert.notCalled(spy);
        });

        it('should move up delayed', async function() {
            const spy = sinon.spy(this.stateService, 'setState');
            this.stateService.getValue = sinon.stub().resolves(50);

            const moved = await this.sut.moveUp(1000);

            expect(moved).to.be.true;
            sinon.assert.calledWith(spy, this.ids.level, 100, 1000);
        });
    });
}

describe('HmRollerShutter', () => {
    describe('ctor', () => {
        it('should throw when ids is null/undefined', () => {
            const stateService = Mock.of<StateService>();
            const id = new HmDeviceId('NEQ1100467');
            const room = 'WG';

            // @ts-ignore
            expect(() => new HmRollerShutter(id, room, stateService, null)).to.throw();
            // @ts-ignore
            expect(() => new HmRollerShutter(id, room, stateService, undefined)).to.throw();
        });

        it('should create', () => {
            const stateService = Mock.of<StateService>();
            const id = new HmDeviceId('NEQ1100467');
            const room = 'WG';
            const ids: RollerShutterStateIds = {
                level: new HmStateId(id, 1, 'LEVEL'),
                moving: new HmStateId(id, 1, 'WORKING'),
            };

            const dev = new HmRollerShutter(id, room, stateService, ids);

            expect(dev.room).to.equal(room);
            expect(dev.id).to.equal(id);
        });
    });

    beforeEach(function() {
        this.stateService = Mock.of<StateService>({
            setState: () => {
            },
            getValue: function() {
                return Promise.resolve(1);
            },
            register: () => {
            },
        });
        this.id = new HmDeviceId('NEQ1100467');
        this.room = 'WG';
        this.ids = {
            level: new HmStateId(this.id, 1, 'LEVEL'),
            moving: new HmStateId(this.id, 1, 'WORKING'),
        };

        this.sut = new HmRollerShutter(this.id, this.room, this.stateService, this.ids);
    });

    executeHmRollerShutterTests();
});
