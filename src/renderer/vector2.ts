import { ArrayData } from "./arrayData";

export class Vector2 implements ArrayData<number>{
    public x: number;
    public y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    toArray(): number[] {
        return [this.x, this.y];
    }
}