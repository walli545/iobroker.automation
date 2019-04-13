/**
 * Id of a state.
 */
export interface StateId {
    /**
     * Builds the complete if of the state.
     */
    get(): string;

    /**
     * Indicates whether the state is from own module or foreign.
     */
    isForeign(): boolean;
}
