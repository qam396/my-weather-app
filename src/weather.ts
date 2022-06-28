export interface Options {
    name?: string;
    temperature?: number;
    country?: string;
    icon?: string;
}
export declare class Weather implements Options {
    name?: string;
    temperature?: number;
    country?: string;
    icon?: string;
    constructor(options: Options);
}