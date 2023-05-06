/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-05-06 18:03:53
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-05-06 19:02:59
 * @FilePath     : \web_renderer\src\renderer\webgl\webglShaderProgram.ts
 * @Description  : 修改描述
 */

import { Matrix3 } from "../matrix3";
import { Matrix4 } from "../matrix4";
import { ShaderProgram } from "../shaderProgram";
import { Vector2 } from "../vector2";
import { Vector3 } from "../vector3";

export class WebglShaderProgram implements ShaderProgram {
    private _program: WebGLProgram;

    constructor(private _gl: WebGLRenderingContext) {
        this._program = this._gl.createProgram();
    }

    initShaderProgram(vertexShaderSource: string, fragmentShaderSource: string): void {
        const vertexShader = this.loadShader(this._gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.loadShader(this._gl.FRAGMENT_SHADER, fragmentShaderSource);

        this._gl.attachShader(this._program, vertexShader);
        this._gl.attachShader(this._program, fragmentShader);
        this._gl.linkProgram(this._program);

        if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) {
            alert(
                `Unable to initialize the shader program: ${this._gl.getProgramInfoLog(this._program)}`
            );
        }
    }

    private loadShader(type: number, source: string): WebGLShader {
        const shader = this._gl.createShader(type);
        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);

        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
            alert(`An error occurred compiling the shaders: ${this._gl.getShaderInfoLog(shader)}`);
            this._gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    useProgram(): void {
        this._gl.useProgram(this._program);
    }

    setUniform(name: string, value: number | Vector2 | Vector3 | Matrix3 | Matrix4): void {
        const location = this._gl.getUniformLocation(this._program, name);
        if (typeof value === 'number') {
            this._gl.uniform1f(location, value);
        } else if (value instanceof Vector2) {
            this._gl.uniform2fv(location, value.toArray());
        } else if (value instanceof Vector3) {
            this._gl.uniform3fv(location, value.toArray());
        } else if (value instanceof Matrix3) {
            this._gl.uniformMatrix3fv(location, false, value.toArray());
        } else if (value instanceof Matrix4) {
            this._gl.uniformMatrix4fv(location, false, value.toArray());
        }
    }



    get program(): WebGLProgram {
        return this._program;
    }
}
