import {StateId} from '../interfaces/devices/StateId';

export class IoBrokerId implements StateId {
    private readonly _adapter: string;

    private readonly _instance: number;

    private readonly _path: string[];

    private readonly _state: string;

    constructor(adapter: string, instance: number, state: string, ...path: string[]) {
        if (!adapter) {
            throw new Error('adapter may not be null, undefined or empty');
        }
        if (!state) {
            throw new Error('state may not be null, undefined or empty');
        }
        if (instance < 0) {
            throw new Error('instance may not be negative');
        }
        this._adapter = adapter;
        this._instance = instance;
        this._path = path;
        this._state = state;
    }

    public get adapter(): string {
        return this._adapter;
    }

    public get instance(): number {
        return this._instance;
    }

    public get path(): string[] {
        return this._path;
    }

    public get state(): string {
        return this._state;
    }

    public get(): string {
        let result: string = `${this.adapter}.${this.instance}.`;
        result += this.path.join('.');
        if (this.path.length !== 0) {
            result += '.';
        }
        result += this.state;
        return result;
    }

    public isForeign(): boolean {
        return true;
    }

}
