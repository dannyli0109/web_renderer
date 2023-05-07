/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-05-06 18:03:53
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-05-06 19:02:59
 * @FilePath     : \web_renderer\src\renderer\webgl\webglShaderProgram.ts
 * @Description  : 修改描述
 */

import { Buffer, WebglBuffer } from "../buffer";
import { Matrix3 } from "../matrix3";
import { Matrix4 } from "../matrix4";
import { ShaderProgram } from "../shaderProgram";
import { Vector2 } from "../vector2";
import { Vector3 } from "../vector3";
import { Vector4 } from "../vector4";

export class WebglShaderProgram implements ShaderProgram {
    private _program: WebGLProgram;
    private _shaderMap: { [type: number]: WebGLShader } = {};

    constructor(private _gl: WebGLRenderingContext) {
        this._program = this._gl.createProgram();
    }

    link(): void {
        this._gl.linkProgram(this._program);
        if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) {
            alert(
                `Unable to initialize the shader program: ${this._gl.getProgramInfoLog(this._program)}`
            );
            return;
        }

        for (let key in this._shaderMap) {
            this._gl.detachShader(this._program, this._shaderMap[key]);
            this._gl.deleteShader(this._shaderMap[key]);
        }

        this._shaderMap = {};
    }

    public async attach(type: number, path: string) {
        if (!this._shaderMap[type]) {
            this._shaderMap[type] = await this.createShader(type, path);
            this._gl.attachShader(this._program, this._shaderMap[type]);
        }
    }

    private async createShader(type: number, path: string): Promise<WebGLShader> {
        const shader = this._gl.createShader(type);
        let res = await fetch(path);
        let source = await res.text();
        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);

        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
            alert(`An error occurred compiling the shaders: ${this._gl.getShaderInfoLog(shader)}`);
            this._gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    use(): void {
        this._gl.useProgram(this._program);
    }

    setUniform(name: string, value: number | Vector2 | Vector3 | Vector4 | Matrix3 | Matrix4): void {
        const location = this._gl.getUniformLocation(this._program, name);
        if (typeof value === 'number') {
            this._gl.uniform1f(location, value);
        } else if (value instanceof Vector2) {
            this._gl.uniform2fv(location, value.toArray());
        } else if (value instanceof Vector3) {
            this._gl.uniform3fv(location, value.toArray());
        } else if (value instanceof Vector4) {
            this._gl.uniform4fv(location, value.toArray());
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
