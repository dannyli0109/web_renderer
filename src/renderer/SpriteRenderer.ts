import { ArrayData } from "./arrayData";
import { Matrix4 } from "./matrix4";
import { Mesh } from "./mesh";
import { Renderer } from "./renderer";
import { ShaderProgram } from "./shaderProgram";
import { Texture } from "./texture";
import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";
import { Vector4 } from "./vector4";

type SpriteVertex =
{
    position: Vector3;
	uv: Vector2;
	color: Vector4;
	tiling: Vector2;
	textureIndex: number;
};

const SPRITE_VERTEX_ATTRIBUTES = [
    3, 2, 4, 2, 1
];

export class SpriteRenderer {
    private _shaderProgram: ShaderProgram;
    private _renderer: Renderer;
    private  _maxVertices: number;
    private _maxIndices: number;
    private _maxTextureSlots: number;
    // private _verticies: {
    //     position: Vector3,
    //     uv: Vector2,
    //     color: Vector4,
    //     tiling: Vector2,
    //     textureIndex: number
    // }[];
    private _verticies: SpriteVertex[];
    private _indicies: Uint32Array;
    private _texures: Texture[];
    private _textureCount: number = 0;
    constructor(renderer: Renderer, shaderProgram: ShaderProgram, batchSize: number = 512) {
        this._renderer = renderer;
        this._shaderProgram = shaderProgram;
        this._maxVertices = batchSize * 4;
        this._maxIndices = batchSize * 6;
        this._maxTextureSlots = 32; // TODO: Query from GPU

        // Create buffers
        // Create vertex buffer
        let vertexBuffer = this._renderer.createBuffer();
        // Create index buffer
        let indexBuffer = this._renderer.createBuffer();
        // Create vertex array object
        let vao = this._renderer.createVertexArray();

        // fill vertices and indices
        // this._verticies = 
        // this._verticies = new ArrayBuffer(this._maxVertices);
        this._verticies = new Array<SpriteVertex>(this._maxVertices);
        this._indicies = new Uint32Array(this._maxIndices);
        // fill textures
        this._texures = new Array<Texture>(this._maxTextureSlots);

        let offset = 0;
        for (let i = 0; i < this._maxIndices; i += 6) {
            this._indicies[i + 0] = offset + 0;
            this._indicies[i + 1] = offset + 1;
            this._indicies[i + 2] = offset + 2;
            this._indicies[i + 3] = offset + 2;
            this._indicies[i + 4] = offset + 3;
            this._indicies[i + 5] = offset + 0;
            offset += 4;   
        }

        for (let i = 0; i < this._maxTextureSlots; i++) {
            this._shaderProgram.setUniform(`u_Textures[${i}]`, i);
        }

        this._textureCount = 0;

        // bind buffers
        this._renderer.bindBuffer(this._renderer.BUFFER_TYPE.ARRAY_BUFFER, vertexBuffer);
        this._renderer.bufferData(this._renderer.BUFFER_TYPE.ARRAY_BUFFER, vertexBuffer, null, this._renderer.BUFFER_USAGE.DYNAMIC_DRAW);

        this._renderer.bindBuffer(this._renderer.BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this._renderer.bufferData(this._renderer.BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, indexBuffer, this._indicies, this._renderer.BUFFER_USAGE.STATIC_DRAW);

        this._renderer.bindVertexArray(vao);
        this._renderer.bindBuffer(this._renderer.BUFFER_TYPE.ARRAY_BUFFER, vertexBuffer);
        this._renderer.bindBuffer(this._renderer.BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, indexBuffer);

        let dataSize = 0;
        for (let i = 0; i < SPRITE_VERTEX_ATTRIBUTES.length; i++) {
            dataSize += SPRITE_VERTEX_ATTRIBUTES[i];
        }
        dataSize *= Float32Array.BYTES_PER_ELEMENT;

        for (let i = 0; i < SPRITE_VERTEX_ATTRIBUTES.length; i++) {
            this._renderer.enableVertexAttribArray(i);
            this._renderer.vertexAttribPointer(
                i, 
                SPRITE_VERTEX_ATTRIBUTES[i], 
                this._renderer.DATA_TYPE.FLOAT, 
                false, 
                dataSize, 
                SPRITE_VERTEX_ATTRIBUTES.slice(0, i).reduce((a, b) => a + b, 0) * Float32Array.BYTES_PER_ELEMENT
            );
        }
        this._renderer.bindVertexArray(null);
        this._renderer.bindBuffer(this._renderer.BUFFER_TYPE.ARRAY_BUFFER, null);
        this._renderer.bindBuffer(this._renderer.BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, null);
    }
    /*
        {-0.5f, 0.5f, 0, 1.0f},
		{0.5f, 0.5f, 0, 1.0f},
		{-0.5f, -0.5f, 0, 1.0f},
		{0.5f, -0.5f, 0, 1.0f}
    */
    protected readonly _quadPositions: Vector4[] = [
        new Vector4(-0.5, 0.5, 0, 1),
        new Vector4(0.5, 0.5, 0, 1),
        new Vector4(-0.5, -0.5, 0, 1),
        new Vector4(0.5, -0.5, 0, 1)
    ];

    /**
     *  {0, 0},
		{1, 0},
		{0, 1},
		{1, 1}
     */
    protected readonly _quadUvs: Vector2[] = [
        new Vector2(0, 0),
        new Vector2(1, 0),
        new Vector2(0, 1),
        new Vector2(1, 1)
    ];

    submitMesh(mesh: Mesh): void {

    }

    beginScene(projectionMatrix: Matrix4) {


    }
    endScene() {

    }
}