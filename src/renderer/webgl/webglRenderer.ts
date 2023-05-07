/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-05-06 16:14:40
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-05-06 17:52:08
 * @FilePath     : \web_renderer\src\renderer\webgl\webglRenderer.ts
 * @Description  : 修改描述
 */
import { Buffer, WebglBuffer } from "../buffer";
import { Mesh } from "../mesh";
import { Renderer } from "../renderer";
import { ShaderProgram } from "../shaderProgram";
import { WebglShaderProgram } from "./webglShaderProgram";

export class WebglRenderer extends Renderer {
    get DATA_TYPE(): { UNSIGNED_BYTE: number; UNSIGNED_SHORT: number; UNSIGNED_INT: number; FLOAT: number; } {
        return {
            UNSIGNED_BYTE: this._gl.UNSIGNED_BYTE,
            UNSIGNED_SHORT: this._gl.UNSIGNED_SHORT,
            UNSIGNED_INT: this._gl.UNSIGNED_INT,
            FLOAT: this._gl.FLOAT
        }
    }
    get BUFFER_TYPE(): { ARRAY_BUFFER: number; ELEMENT_ARRAY_BUFFER: number; } {
        return {
            ARRAY_BUFFER: this._gl.ARRAY_BUFFER,
            ELEMENT_ARRAY_BUFFER: this._gl.ELEMENT_ARRAY_BUFFER
        }
    }
    get BUFFER_USAGE(): { STATIC_DRAW: number; DYNAMIC_DRAW: number; STREAM_DRAW: number; } {
        return {
            STATIC_DRAW: this._gl.STATIC_DRAW,
            DYNAMIC_DRAW: this._gl.DYNAMIC_DRAW,
            STREAM_DRAW: this._gl.STREAM_DRAW
        }
    }
    private static _instance: WebglRenderer;
    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;
    private _shaderPrograms: { [key: string]: ShaderProgram } = {}
    
    private constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this._canvas.style.width = '100vw';
        this._canvas.style.height = '100vh';
        this._canvas.style.display = 'block';
        document.body.appendChild(this._canvas);
        this._gl = this._canvas.getContext('webgl');
    }

    createVertexArray() {
        return null;
    }

    bindVertexArray(vertexArray: any): void {
        
    }
    
    public static getInstance(): WebglRenderer {
        if (!WebglRenderer._instance) {
            WebglRenderer._instance = new WebglRenderer();
        }
        return WebglRenderer._instance;
    }

    submitMesh(mesh: Mesh): void {
        throw new Error("Method not implemented.");
    }

    draw(): void {
        this._gl.drawArrays(this._gl.POINTS, 0, 1);
    }

    createBuffer(): Buffer {
        return new WebglBuffer(this._gl);
    }

    bindBuffer(type: number, buffer: Buffer): void {
        buffer.bind(type);
    }

    bufferData(type: number, buffer: Buffer, data: BufferSource, usage: number): void {
        this._gl.bufferData(type, data, usage);
    }


    async createShader(key: string, vertexShaderPath: string, fragmentShaderPath: string): Promise<ShaderProgram> {
        if (!this._shaderPrograms[key])
        {
            this._shaderPrograms[key] = new WebglShaderProgram(this._gl);
            await this._shaderPrograms[key].attach(this._gl.VERTEX_SHADER, vertexShaderPath);
            await this._shaderPrograms[key].attach(this._gl.FRAGMENT_SHADER, fragmentShaderPath);
            this._shaderPrograms[key].link();
        }
        return this._shaderPrograms[key];
    }

    useProgram(key: string): void {
        this._shaderPrograms[key].use();
    }

    getAttribLocation(key: string, name: string): number {
        return 0;
    }
    getUniformLocation(key: string, name: string) {

    }
    enableVertexAttribArray(index: number): void {
        this._gl.enableVertexAttribArray(index);
    }
    vertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void {
        this._gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }
}