import { Buffer } from "./buffer";
import { Matrix3 } from "./matrix3";
import { Matrix4 } from "./matrix4";
import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";
import { Vector4 } from "./vector4";

export interface ShaderProgram {
    // initShaderProgram(vertexShaderSource: string, fragmentShaderSource: string): void;
    attach(type: number, path: string): Promise<void>;
    link(): void;
    use(): void;
    setUniform(name: string, value: number | Vector2 |  Vector3 | Vector4 | Matrix3 | Matrix4): void;
}