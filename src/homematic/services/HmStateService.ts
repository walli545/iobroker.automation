import {IoBrokerStateService} from '../../IoBrokerStateService';

class HmStateService extends IoBrokerStateService {
	public async getState(id: string): Promise<ioBroker.State> {
		return await super.getState(id);
	}

	public setState(id: string, state: string | number | boolean): void {
		super.setState(id, state);
	}
}
