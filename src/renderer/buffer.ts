export interface Buffer {
    bind(type: number);
}

// WebglBuffer
export class WebglBuffer implements Buffer {
    private _buffer: WebGLBuffer;
    constructor(private _gl: WebGLRenderingContext) {
        this._buffer = this._gl.createBuffer();
    }
    bind(type: number) {
        this._gl.bindBuffer(type, this._buffer);
    }
}