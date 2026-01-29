import type { PerspectiveCamera, WebGLRenderer } from "three";
import { throttle } from "../utils/tools";
const setSize = (
  container: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};
class Resizer {
  constructor(
    container: HTMLElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
  ) {
    setSize(container, camera, renderer);
    window.addEventListener(
      "resize",
      throttle(() => {
        setSize(container, camera, renderer);
        this.onResize();
      }, 500),
    );
  }
  onResize() {}
}

export { Resizer };
