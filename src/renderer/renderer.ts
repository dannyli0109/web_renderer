import { Color } from "./color";
import { Mesh } from "./mesh";
import { Shader } from "./shader";
import { Texture } from "./texture";
import { Vector3 } from "./vector3";

// Create a new interface to define renderer methods
export interface Renderer {
    // Define a method to render a Mesh with a Shader
    rederMesh(mesh: Mesh, shader: Shader): void;

    // Define a method to create a Texture
    createTexture(path: string): Texture;

    // Define a method to bind a Texture
    bindTexture(textrue: Texture): void;

    // Define a method to set the Light position
    setLightPosition(position: Vector3): void;

    // Define a method to set the Light color
    setLightColor(color: Color): void;
    
}