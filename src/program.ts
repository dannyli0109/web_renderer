/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-05-06 17:46:22
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-05-06 17:57:44
 * @FilePath     : \web_renderer\src\program.ts
 * @Description  : 修改描述
 */

import { WebglRenderer } from "./renderer/webgl/webglRenderer";

export class Program {
    private _then: number = 0;
    private _elapsed: number;

    init() {
        WebglRenderer.getInstance();
    }

    update() {
        this._then = Date.now();
        requestAnimationFrame(this.updateFrame.bind(this));
    }

    updateFrame(now: number) {
        this._elapsed = now - this._then;
        this._then = now;
        let dt = this._elapsed / 1000;
        console.log(dt);
        requestAnimationFrame(this.updateFrame.bind(this));
    }

}
