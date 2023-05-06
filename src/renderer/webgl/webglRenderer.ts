/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-05-06 16:14:40
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-05-06 17:52:08
 * @FilePath     : \web_renderer\src\renderer\webgl\webglRenderer.ts
 * @Description  : 修改描述
 */
import { Buffer } from "../buffer";
import { Renderer } from "../renderer";
import { Shader } from "../shader";
import { ShaderProgram } from "../shaderProgram";

export class WebglRenderer implements Renderer {
    private static _instance: WebglRenderer;
    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;

    private constructor() {
        this._canvas = document.createElement('canvas');
        this._canvas.style.width = '100vw';
        this._canvas.style.height = '100vh';
        this._canvas.style.display = 'block';
        document.body.appendChild(this._canvas);
        this._gl = this._canvas.getContext('webgl');
    }

    public static getInstance(): WebglRenderer {
        if (!WebglRenderer._instance) {
            WebglRenderer._instance = new WebglRenderer();
        }
        return WebglRenderer._instance;
    }

    createBuffer(): Buffer {
        return null;
    }
    bindBuffer(buffer: Buffer): void {

    }
    bufferData(target: number, data: number | ArrayBuffer, usage: number): void {

    }
    createShader(type: number): Shader {
        return null;
    }
    attachShader(program: ShaderProgram, shader: Shader): void {

    }
    compileShader(shader: Shader): void {

    }
    createProgram(): ShaderProgram {
        return null;
    }
    useProgram(program: ShaderProgram): void {

    }
    linkProgram(program: ShaderProgram): void {

    }
    getAttribLocation(program: ShaderProgram, name: string): number {
        return 0;
    }
    getUniformLocation(program: ShaderProgram, name: string) {

    }
    enableVertexAttribArray(index: number): void {

    }
    vertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void {

    }
    drawArrays(mode: number, start: number, count: number): void {

    }

}