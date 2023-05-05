import { Matrix4 } from "./matrix4";
import { Shader } from "./shader";
import { Vector3 } from "./vector3";

// Define the implementation of the Shader interface for WebGPU
export class WebGPUShader implements Shader {
    private module: GPUShaderModule;

    constructor(private device: GPUDevice) {}

    compile(vertexSource: string, fragmentSource: string): void {
        // Implementation of the WebGPU shader compilation code
    }

    use(): void {
        // Implementation of the WebGPU shader activation code
    }

    setUniform(name: string, value: number | Vector3 | Matrix4): void {
        // Implementation of the WebGPU uniform setting code
    }
}