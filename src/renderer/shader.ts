import { Matrix3 } from "./matrix3";
import { Matrix4 } from "./matrix4";
import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

export interface Shader {
    compile(vertexSource: string, fragmentSource: string): void;
    use(): void;
    setUniform(name: string, value: number | Vector2 | Vector3 | Matrix3 | Matrix4): void;
}

