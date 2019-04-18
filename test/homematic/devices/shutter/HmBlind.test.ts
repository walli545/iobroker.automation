import {expect} from 'chai';
import sinon = require('sinon');
import {Mock} from 'ts-mockery';
import {HmDeviceId} from '../../../../src/homematic/devices/HmDeviceId';
import {HmStateId} from '../../../../src/homematic/devices/HmStateId';
import {HmBladeOrientationConfig} from '../../../../src/homematic/devices/shutter/HmBladeOrientationConfig';
import {HmBlind} from '../../../../src/homematic/devices/shutter/HmBlind';
import {BladeOrientation} from '../../../../src/interfaces/devices/shutter/BladeOrientation';
import {State} from '../../../../src/interfaces/devices/State';
import {StateService} from '../../../../src/interfaces/services/StateService';
import {executeHmRollerShutterTests} from './HmRollerShutter.test';

describe('HmBlind', function() {
    beforeEach(function() {
        this.stateService = Mock.of<StateService>({
            setState: () => {
            }, getValue: function() {
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
            orientation: new HmStateId(this.id, 1, 'ORIENTATION'),
            lastLevel: new HmStateId(this.id, 1, 'LEVEL_OLD'),
        };
        this.config = new HmBladeOrientationConfig(-4, 5000);
        this.config.addRelativeMovement(BladeOrientation.Down, 1).addRelativeMovement(BladeOrientation.Flat, 1.5).addRelativeMovement(BladeOrientation.Up, 2.5);

        this.sut = new HmBlind(this.id, this.room, this.stateService, this.ids, this.config);
    });

    describe('ctor', () => {
        it('should register for state change events', function() {
            const stub = sinon.stub().callsFake(() => {
            });
            this.stateService.register = stub;

            const dev = new HmBlind(this.id, this.room, this.stateService, this.ids, this.config);

            expect(stub).to.have.been.calledWith(dev);
        });

        it('should create', function() {
            this.stateService.register = sinon.stub().callsFake(() => {
            });
            const sut = new HmBlind(this.id, this.room, this.stateService, this.ids, this.config);

            expect(sut).not.to.be.null;
        });
    });

    describe('setBladeOrientation', function() {
        it('should set blade orientation to Flat', function() {
            const spy = sinon.spy(this.stateService, 'setState');

            this.sut.setBladeOrientation(BladeOrientation.Flat);

            expect(spy).to.have.been.calledWith(this.ids.orientation, BladeOrientation.Flat, 0);
        });

        it('should set blade orientation to Up', function() {
            const spy = sinon.spy(this.stateService, 'setState');

            this.sut.setBladeOrientation(BladeOrientation.Up);

            expect(spy).to.have.been.calledWith(this.ids.orientation, BladeOrientation.Up, 0);
        });

        it('should set blade orientation to Down', function() {
            const spy = sinon.spy(this.stateService, 'setState');

            this.sut.setBladeOrientation(BladeOrientation.Down);

            expect(spy).to.have.been.calledWith(this.ids.orientation, BladeOrientation.Down, 0);
        });

        it('should set blade orientation delayed', function() {
            const spy = sinon.spy(this.stateService, 'setState');

            this.sut.setBladeOrientation(BladeOrientation.Flat, 1_000);

            expect(spy).to.have.been.calledWith(this.ids.orientation, BladeOrientation.Flat, 1_000);
        });
    });

    describe('getBladeOrientation', function() {
        it('should get blade orientation Flat', async function() {
            const stub = sinon.stub().resolves(BladeOrientation.Flat);
            this.stateService.getValue = stub;

            const orientation = await this.sut.getBladeOrientation();

            expect(orientation).to.be.equal(BladeOrientation.Flat);
            expect(stub).to.have.been.calledWith(this.ids.orientation);
        });

        it('should get blade orientation Up', async function() {
            const stub = sinon.stub().resolves(BladeOrientation.Up);
            this.stateService.getValue = stub;

            const orientation = await this.sut.getBladeOrientation();

            expect(orientation).to.be.equal(BladeOrientation.Up);
            expect(stub).to.have.been.calledWith(this.ids.orientation);
        });

        it('should get blade orientation Down', async function() {
            const stub = sinon.stub().resolves(BladeOrientation.Down);
            this.stateService.getValue = stub;

            const orientation = await this.sut.getBladeOrientation();

            expect(orientation).to.be.equal(BladeOrientation.Down);
            expect(stub).to.have.been.calledWith(this.ids.orientation);
        });
    });

    describe('subscribedStates', function() {
        it('should include moving', function() {
            const subscriptions = this.sut.subscribedStates();

            expect(subscriptions).to.include(this.ids.moving);
        });

        it('should include orientation', function() {
            const subscriptions = this.sut.subscribedStates();

            expect(subscriptions).to.include(this.ids.orientation);
        });
    });

    describe('on', function() {
        it('should set lastLevel to current level when movement started', async function() {
            const setStateSpy = sinon.spy(this.stateService, 'setState');
            const getLevelStub = sinon.stub().resolves(20);
            this.stateService.getValue = getLevelStub;

            const state: State = {
                val: true,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.moving, state);

            expect(setStateSpy).to.have.been.calledWith(this.ids.lastLevel, 20);
            expect(getLevelStub).to.have.been.called;
        });

        it('should set orientation to flat when moved 10% downwards', async function() {
            const setStateSpy = sinon.spy(this.stateService, 'setState');
            const getValueStub = sinon.stub().callsFake((id) => {
                if (id === this.ids.level) {
                    return 20;
                }
                if (id === this.ids.lastLevel) {
                    return 30;
                }
            });
            this.stateService.getValue = getValueStub;

            const state: State = {
                val: false,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.moving, state);

            expect(setStateSpy).to.have.been.calledWith(this.ids.orientation, BladeOrientation.Flat, 500);
            expect(getValueStub).to.have.been.calledTwice;
        });

        it('should set orientation to flat when moved from 100% to 0%', async function() {
            const setStateSpy = sinon.spy(this.stateService, 'setState');
            const getValueStub = sinon.stub().callsFake((id) => {
                if (id === this.ids.level) {
                    return 0;
                }
                if (id === this.ids.lastLevel) {
                    return 100;
                }
            });
            this.stateService.getValue = getValueStub;

            const state: State = {
                val: false,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.moving, state);

            expect(setStateSpy).to.have.been.calledWith(this.ids.orientation, BladeOrientation.Flat, 500);
            expect(getValueStub).to.have.been.calledTwice;
        });

        it('should set orientation to flat when moved 10% upwards', async function() {
            const setStateSpy = sinon.spy(this.stateService, 'setState');
            const getValueStub = sinon.stub().callsFake((id) => {
                if (id === this.ids.level) {
                    return 30;
                }
                if (id === this.ids.lastLevel) {
                    return 20;
                }
            });
            this.stateService.getValue = getValueStub;

            const state: State = {
                val: false,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.moving, state);

            expect(setStateSpy).to.have.been.calledWith(this.ids.orientation, BladeOrientation.Flat, 500);
            expect(getValueStub).to.have.been.calledTwice;
        });

        it('should not set orientation when moved to 100%', async function() {
            const setStateSpy = sinon.spy(this.stateService, 'setState');
            const getValueStub = sinon.stub().callsFake((id) => {
                if (id === this.ids.level) {
                    return 100;
                }
                if (id === this.ids.lastLevel) {
                    return 0;
                }
            });
            this.stateService.getValue = getValueStub;

            const state: State = {
                val: false,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.moving, state);

            expect(setStateSpy).to.have.not.have.been.called;
            expect(getValueStub).to.have.been.calledTwice;
        });

        it('should on orientation change move {reset%} down and {Down%} up when level is greater than |{reset%}|', async function() {
            const moveRelativeStub = sinon.stub().resolves();
            this.sut.moveRelative = moveRelativeStub;
            const setLevelStub = sinon.stub().resolves();
            this.sut.setLevel = setLevelStub;

            this.stateService.getValue = sinon.stub().resolves(20);

            const state: State = {
                val: BladeOrientation.Down,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.orientation, state);

            expect(moveRelativeStub).to.have.been.calledWith(this.config.ResetPercentage);
            expect(setLevelStub).to.have.been.calledWith(17, this.config.AfterResetDelay);
            expect(moveRelativeStub).to.have.been.calledBefore(setLevelStub);
        });

        it('should on orientation change move {reset%} down and {Flat%} up when level is greater than |{reset%}|', async function() {
            const moveRelativeStub = sinon.stub().resolves();
            this.sut.moveRelative = moveRelativeStub;
            const setLevelStub = sinon.stub().resolves();
            this.sut.setLevel = setLevelStub;

            this.stateService.getValue = sinon.stub().resolves(50);

            const state: State = {
                val: BladeOrientation.Flat,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.orientation, state);

            expect(moveRelativeStub).to.have.been.calledWith(this.config.ResetPercentage);
            expect(setLevelStub).to.have.been.calledWith(47.5, this.config.AfterResetDelay);
            expect(moveRelativeStub).to.have.been.calledBefore(setLevelStub);
        });

        it('should on orientation change move {reset%} down and {Up%} up when level is greater than |{reset%}|', async function() {
            const moveRelativeStub = sinon.stub().resolves();
            this.sut.moveRelative = moveRelativeStub;
            const setLevelStub = sinon.stub().resolves();
            this.sut.setLevel = setLevelStub;

            this.stateService.getValue = sinon.stub().resolves(88);

            const state: State = {
                val: BladeOrientation.Up,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.orientation, state);

            expect(moveRelativeStub).to.have.been.calledWith(this.config.ResetPercentage);
            expect(setLevelStub).to.have.been.calledWith(86.5, this.config.AfterResetDelay);
            expect(moveRelativeStub).to.have.been.calledBefore(setLevelStub);
        });

        it('should on orientation change move to 0% and {Up%} up when level is |{reset%}|', async function() {
            const moveRelativeStub = sinon.stub().resolves();
            this.sut.moveRelative = moveRelativeStub;
            const setLevelStub = sinon.stub().resolves();
            this.sut.setLevel = setLevelStub;
            const moveDownStub = sinon.stub().resolves(true);
            this.sut.moveDown = moveDownStub;
            this.stateService.getValue = sinon.stub().resolves(4);

            const state: State = {
                val: BladeOrientation.Up,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.orientation, state);

            expect(moveDownStub).to.have.been.called;
            expect(moveRelativeStub).to.not.have.been.called;

            expect(setLevelStub).to.have.been.calledWith(2.5, this.config.AfterResetDelay);
            expect(moveDownStub).to.have.been.calledBefore(setLevelStub);
        });

        it('should on orientation change move to 0% and {Down%} up when level is smaller than |{reset%}|', async function() {
            const moveRelativeStub = sinon.stub().resolves();
            this.sut.moveRelative = moveRelativeStub;
            const setLevelStub = sinon.stub().resolves();
            this.sut.setLevel = setLevelStub;
            const moveDownStub = sinon.stub().resolves(true);
            this.sut.moveDown = moveDownStub;
            this.stateService.getValue = sinon.stub().resolves(2);

            const state: State = {
                val: BladeOrientation.Down,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.orientation, state);

            expect(moveDownStub).to.have.been.called;
            expect(moveRelativeStub).to.not.have.been.called;

            expect(setLevelStub).to.have.been.calledWith(1, this.config.AfterResetDelay);
            expect(moveDownStub).to.have.been.calledBefore(setLevelStub);
        });

        it('should on orientation change move {Flat%} up when level is 0%', async function() {
            const moveRelativeStub = sinon.stub().resolves();
            this.sut.moveRelative = moveRelativeStub;
            const setLevelStub = sinon.stub().resolves();
            this.sut.setLevel = setLevelStub;
            const moveDownStub = sinon.stub().resolves(true);
            this.sut.moveDown = moveDownStub;
            this.stateService.getValue = sinon.stub().resolves(0);

            const state: State = {
                val: BladeOrientation.Flat,
                from: 'javascript',
                ts: Date.now(),
                lc: Date.now(),
                expire: 0,
                ack: true,
            };

            await this.sut.on(this.ids.orientation, state);

            expect(moveDownStub).to.not.have.been.called;
            expect(moveRelativeStub).to.not.have.been.called;

            expect(setLevelStub).to.have.been.calledWith(1.5, 0);
        });
    });

    executeHmRollerShutterTests();
});
