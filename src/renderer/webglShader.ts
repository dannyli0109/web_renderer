import { Matrix3 } from "./matrix3";
import { Matrix4 } from "./matrix4";
import { Shader } from "./shader";
import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

// Define the implementation of the Shader interface for WebGL
export class WebGLShader implements Shader {
    private _program: WebGLProgram;

    constructor(private _gl: WebGLRenderingContext) {
        this._program = _gl.createProgram();
    }

    compile(vertexSource: string, fragmentSource: string): void {
        // Implementation of the WebGL shader compilation code
        let vertexShader = this._gl.createShader(this._gl.VERTEX_SHADER);
        this._gl.shaderSource(vertexShader, vertexSource);
        this._gl.compileShader(vertexShader);
        if (!this._gl.getShaderParameter(vertexShader, this._gl.COMPILE_STATUS)) {
            throw new Error(this._gl.getShaderInfoLog(vertexShader));
        }

        let fragmentShader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
        this._gl.shaderSource(fragmentShader, fragmentSource);
        this._gl.compileShader(fragmentShader);
        if (!this._gl.getShaderParameter(fragmentShader, this._gl.COMPILE_STATUS)) {
            throw new Error(this._gl.getShaderInfoLog(fragmentShader));
        }

        this._gl.attachShader(this._program, vertexShader);
        this._gl.attachShader(this._program, fragmentShader);
        this._gl.linkProgram(this._program);
        
        if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) {
            throw new Error(this._gl.getProgramInfoLog(this._program));
        }

        this._gl.deleteShader(vertexShader);
        this._gl.deleteShader(fragmentShader);
    }

    use(): void {
        // Implementation of the WebGL shader activation code
        this._gl.useProgram(this._program);
    }

    setUniform(name: string, value: number | Vector2 | Vector3 | Matrix3 | Matrix4): void {
        // Implementation of the WebGL uniform setting code
        let location = this._gl.getUniformLocation(this._program, name);
        if (typeof value === "number") {
            this._gl.uniform1f(location, value);
        }
        else if (value instanceof Vector2) {
            this._gl.uniform2f(location, value.x, value.y);
        }
        else if (value instanceof Vector3) {
            this._gl.uniform3f(location, value.x, value.y, value.z);
        }
        else if (value instanceof Matrix3) {
            this._gl.uniformMatrix3fv(location, false, value.data);
        }
        else if (value instanceof Matrix4) {
            this._gl.uniformMatrix4fv(location, false, value.data);
        }
    }
}
  