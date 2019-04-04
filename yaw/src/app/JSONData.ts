import { Aircraft } from './aircraft';

export interface JSONData {
    now: number;
    messages: number;
    aircraft: Aircraft[];
}