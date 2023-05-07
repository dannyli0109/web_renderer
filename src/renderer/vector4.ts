import { ArrayData } from "./arrayData";

export class Vector4 implements ArrayData<number>{
    public x: number;
    public y: number;
    public z: number;
    public w: number;
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    
    toArray(): number[] {
        return [this.x, this.y, this.z, this.w];
    }
}