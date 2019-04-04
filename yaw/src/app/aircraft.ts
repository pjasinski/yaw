export interface Aircraft {
    hex: string;
    squawk?: number;
    flight?: string;
    lat?: number;
    lon?: number;
    nucp?: number;
    seen_pos?: number; // how long from "now" the position was last updated
    altitude?: number;
    vert_rate?: number;
    track?: number;
    speed?: number;
    messages: number;
    seen: number;
    rssi: number;

}