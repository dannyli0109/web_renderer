import { ArrayData } from "./arrayData";

export class Matrix3 implements ArrayData<number>{
    private _data: number[] = [];
    constructor() {
        this.identity();
    }
    toArray(): number[] {
        return this._data;
    }

    identity() {
        this._data = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
    }

    add(other: Matrix3): Matrix3 {
        const result = new Matrix3();
        for (let i = 0; i < 9; i++) {
            result._data[i] = this._data[i] + other._data[i];
        }
        return result;
    }

    subtract(other: Matrix3): Matrix3 {
        const result = new Matrix3();
        for (let i = 0; i < 9; i++) {
            result._data[i] = this._data[i] - other._data[i];
        }
        return result;
    }

    get data(): number[] {
        return this._data;
    }
}