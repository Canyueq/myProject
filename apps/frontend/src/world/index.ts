import { Color } from "three";
import type {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Object3DEventMap,
  Mesh,
  Light,
  Matrix4,
} from "three";
import { createCamera } from "../components/camera";
import { createCube } from "../components/cube";
import { createScene } from "../components/scene";
import { createLights } from "../components/light";

import { createRenderer } from "../systems/renderer";
import { Resizer } from "../systems/Resizer";
import { Loop } from "../systems/Loop";

class World {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private scene: Scene<Object3DEventMap>;
  private cube: Mesh; // ✅ 添加类型
  private light: Light; // ✅ 添加类型
  private resizer: Resizer;
  #loop: Loop;
  constructor(
    container: HTMLElement,
    sceneSize: string = "1-2",
    matrix: Matrix4,
  ) {
    console.log("sceneSize", sceneSize);
    const [h, w] = sceneSize.split("-");
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.#loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);
    this.scene.background = new Color("skyblue");

    this.cube = createCube(matrix);
    this.light = createLights();

    this.#loop.updataTables.push(this.cube, this.camera);

    this.scene.add(this.cube, this.light);

    this.resizer = new Resizer(container, this.camera, this.renderer);

    // this.resizer.onResize = () => {
    //   this.render();
    // };

    // Set the camera's aspect ratio to match the container's proportions
    this.camera.aspect = ((w as unknown as number) /
      (h as unknown as number)) as number;
    console.log("aspect", this.camera.aspect);
    // next, set the renderer to the same size as our container element
    // this.renderer.setSize(container.clientWidth, container.clientHeight);

    // finally, set the pixel ratio to ensure our scene will look good on mobile devices
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    // 1. 从场景中移除对象
    this.scene.remove(this.cube, this.light);

    // 2. 从 DOM 中移除 renderer 的 canvas
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }

    // 4. 释放 Three.js 资源
    this.renderer.dispose(); // 释放 WebGL 上下文

    // 5. 释放几何体和材质（防止 GPU 内存泄漏）
    this.cube.geometry.dispose();

    // 6. （可选）如果 light 有自定义资源，也清理（通常不需要）

    // 7. 断开引用（帮助 GC）
    this.camera = null!;
    this.renderer = null!;
    this.scene = null!;
    this.cube = null!;
    this.light = null!;
    this.resizer = null!;
  }

  start() {
    this.#loop.start();
  }
  stop() {
    this.#loop.stop();
  }
}

export { World };
