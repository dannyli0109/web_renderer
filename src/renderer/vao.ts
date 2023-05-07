export interface VAO {
    bind(): void;
    unbind(): void;
    draw(): void;
}

// export class WebglVAO implements VAO {
//     private _vao: WebGLVertexArrayObject;
//     bind(): void {
//         throw new Error("Method not implemented.");
//     }
//     unbind(): void {
//         throw new Error("Method not implemented.");
//     }
//     draw(): void {
//         throw new Error("Method not implemented.");
//     }
    
// }