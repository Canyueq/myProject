import { Color } from "three";
import type {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Object3DEventMap,
} from "three";
import { createCamera } from "../components/camera";
import { createCube } from "../components/cube";
import { createScene } from "../components/scene";

import { createRenderer } from "../systems/renderer";
import { Resizer } from "../systems/Resizer";

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene<Object3DEventMap>;
class World {
  constructor(container: HTMLElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);
    scene.background = new Color("red");
    const cube = createCube();

    scene.add(cube);

    const resizer = new Resizer(container, camera, renderer);
    // Set the camera's aspect ratio to match the container's proportions
    camera.aspect = container.clientWidth / container.clientHeight;

    // next, set the renderer to the same size as our container element
    renderer.setSize(container.clientWidth, container.clientHeight);

    // finally, set the pixel ratio to ensure our scene will look good on mobile devices
    renderer.setPixelRatio(window.devicePixelRatio);
  }

  render() {
    renderer.render(scene, camera);
  }
}

export { World };
