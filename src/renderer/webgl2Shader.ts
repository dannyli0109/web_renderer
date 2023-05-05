import { Matrix4 } from "./matrix4";
import { Shader } from "./shader";
import { Vector3 } from "./vector3";

// Define the implementation of the Shader interface for WebGL2
export class WebGL2Shader implements Shader {
    private program: WebGLProgram;

    constructor(private gl: WebGL2RenderingContext) {}

    compile(vertexSource: string, fragmentSource: string): void {
        // Implementation of the WebGL2 shader compilation code
    }

    use(): void {
        // Implementation of the WebGL2 shader activation code
    }

    setUniform(name: string, value: number | Vector3 | Matrix4): void {
        // Implementation of the WebGL2 uniform setting code
    }
}