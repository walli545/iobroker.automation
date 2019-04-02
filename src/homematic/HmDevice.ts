import {Device} from '../interfaces/Device';
import {StateService} from '../interfaces/services/StateService';

export class HmDevice implements Device {
	private readonly _id: string;

	private readonly _room: string;

	constructor(id: string, room: string, protected stateService: StateService) {
		this._id = id;
		this._room = room;
	}

	get id(): string {
		return this._id;
	}

	get room(): string {
		return this._room;
	}
}
