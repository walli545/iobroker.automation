import {adapter} from '@iobroker/adapter-core/build/utils';

export class IoBrokerStateService implements StateService {
	public async getState(id: string): Promise<ioBroker.State> {
		const result = await adapter('automation').getStateAsync(id);
		if (!result) {
			throw new Error('Could not retrieve state');
		}
		return result;
	}

	public setState(id: string, state: string | number | boolean) {
		adapter('automation').setState(id, state);
	}
}
