import { Color } from "./color";
import { Mesh } from "./mesh";
import { Shader } from "./shader";
import { Texture } from "./texture";
import { Vector3 } from "./vector3";

export interface Renderer {
    rederMesh(mesh: Mesh, shader: Shader): void;
    createTexture(path: string): Texture;
    bindTexture(textrue: Texture): void;

    setLightPosition(position: Vector3): void;
    setLightColor(color: Color): void;
}