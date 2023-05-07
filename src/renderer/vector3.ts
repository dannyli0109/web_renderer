import { ArrayData } from "./arrayData";

export class Vector3 implements ArrayData<number>{
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toArray(): number[] {
        return [this.x, this.y, this.z];
    }
}