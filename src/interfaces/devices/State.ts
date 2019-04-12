/**
 * Source state of a device.
 */
export interface State {
    /** The value of the state. */
    val: any;

    /** Direction flag: false for desired value and true for actual value. Default: false. */
    ack: boolean;

    /** Unix timestamp. Default: current time */
    ts: number;

    /** Unix timestamp of the last time the value changed */
    lc: number;

    /** Name of the adapter instance which set the value, e.g. "system.adapter.web.0" */
    from: string;

    /** Optional time in seconds after which the state is reset to null */
    expire?: number;

    /** Optional comment */
    c?: string;
}
