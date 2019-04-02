export interface StateService {
	getState(id: string): Promise<ioBroker.State>;

	setState(id: string, state: string | number | boolean): void;
}
