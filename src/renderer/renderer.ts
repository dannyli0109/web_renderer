import { Buffer } from "./buffer";
import { Shader } from "./shader";
import { ShaderProgram } from "./shaderProgram";

// Create a new interface to define renderer methods
export interface Renderer {
    // Buffers
    createBuffer(): Buffer;
    bindBuffer(buffer: Buffer): void;
    bufferData(target: number, data: number | ArrayBuffer, usage: number): void;
    // Shaders
    createShader(type: number): Shader;
    attachShader(program: ShaderProgram, shader: Shader): void;
    compileShader(shader: Shader): void;
    // Programs
    createProgram(): ShaderProgram;
    useProgram(program: ShaderProgram): void;
    linkProgram(program: ShaderProgram): void;
    getAttribLocation(program: ShaderProgram, name: string): number;
    getUniformLocation(program: ShaderProgram, name: string): any;
    // Vertex attributes
    enableVertexAttribArray(index: number): void;
    vertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void;
    // Drawing
    drawArrays(mode: number, start: number, count: number): void;
}