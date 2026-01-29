import { Clock } from "three";
import type {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Object3DEventMap,
} from "three";

const clock = new Clock();
class Loop {
  private camera: PerspectiveCamera;
  #scene: Scene<Object3DEventMap>;
  private renderer: WebGLRenderer;
  updataTables: Array<any>;
  constructor(
    camera: PerspectiveCamera,
    scene: Scene<Object3DEventMap>,
    renderer: WebGLRenderer,
  ) {
    this.camera = camera;
    this.#scene = scene;
    this.renderer = renderer;
    this.updataTables = [];
  }
  start() {
    this.renderer.setAnimationLoop(() => {
      // render a frame
      this.renderer.render(this.#scene, this.camera);
      this.tick();
    });
  }
  stop() {
    this.renderer.setAnimationLoop(null);
  }
  tick() {
    const delta = clock.getDelta();
    for (let obj of this.updataTables) {
      obj.tick(delta);
    }
  }
}

export { Loop };
