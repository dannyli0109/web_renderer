import { Buffer } from "./buffer";
import { Matrix4 } from "./matrix4";
import { Mesh } from "./mesh";
import { ShaderProgram } from "./shaderProgram";
import { Texture } from "./texture";
import { Vector4 } from "./vector4";

// Create a new interface to define renderer methods
export abstract class Renderer {
    // Buffers
    abstract createBuffer(): Buffer;
    abstract bindBuffer(type: number, buffer: Buffer): void;
    abstract bufferData(type: number, buffer: Buffer, data: BufferSource, usage: number): void;
    // Programs
    abstract createShader(key: string, vertexShaderPath: string, fragmentShaderPath: string):  Promise<ShaderProgram>;
    abstract useProgram(key: string): void;
    abstract getAttribLocation(key: string, name: string): number;
    abstract getUniformLocation(key: string, name: string): any;
    // Vertex attributes
    abstract createVertexArray(): any;
    abstract bindVertexArray(vertexArray: any): void;
    abstract enableVertexAttribArray(index: number): void;
    abstract vertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void;
    // draw
    abstract draw(): void;

    abstract get BUFFER_USAGE(): { STATIC_DRAW: number; DYNAMIC_DRAW: number; STREAM_DRAW: number; };
    abstract get BUFFER_TYPE(): { ARRAY_BUFFER: number; ELEMENT_ARRAY_BUFFER: number; };
    abstract get DATA_TYPE(): { UNSIGNED_BYTE: number; UNSIGNED_SHORT: number; UNSIGNED_INT: number; FLOAT: number; };
}