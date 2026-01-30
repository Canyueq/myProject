import { Color } from "three";
import type {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Object3DEventMap,
  Mesh,
  Matrix4,
  Group,
} from "three";
import {
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  SpotLight,
} from "three";
import { createCamera } from "../components/camera";
import { createCube } from "../components/cube";
import { createScene } from "../components/scene";
import { createLights } from "../components/light";
import { createMeshGroup } from "../components/meshGroup";

import { createRenderer } from "../systems/renderer";
import { Resizer } from "../systems/Resizer";
import { Loop } from "../systems/Loop";
import { createControls, type MyControls } from "../systems/controls";

class World {
  protected camera: PerspectiveCamera;
  protected renderer: WebGLRenderer;
  protected scene: Scene<Object3DEventMap>;
  protected cube: Mesh; // ✅ 添加类型
  protected meshGroup: Group;
  protected light: DirectionalLight; // ✅ 添加类型
  protected ambientLightn: AmbientLight;
  protected hemisphereLight: HemisphereLight;
  protected resizer: Resizer;
  protected controls: MyControls;
  protected loop: Loop;
  constructor(
    container: HTMLElement,
    sceneSize: string = "1-2",
    matrix: Matrix4,
  ) {
    // console.log("sceneSize", sceneSize);
    const [h, w] = sceneSize.split("-");
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);
    this.scene.background = new Color("skyblue");
    this.cube = createCube(matrix);
    this.meshGroup = createMeshGroup();
    const { light, ambientLight, hemisphereLight } = createLights({
      x: 5,
      y: 10,
      z: 5,
    });
    this.light = light;
    this.ambientLightn = ambientLight;
    this.hemisphereLight = hemisphereLight;
    this.camera.aspect = ((w as unknown as number) /
      (h as unknown as number)) as number;

    //1.先在场景中添加灯光，相机通过渲染器渲染
    // this.scene.add(
    //   this.cube,
    //   this.light,
    //   this.protected ambientLightn,
    //   this.protected hemisphereLight,
    // );
    //2-1.不在场景中添加灯光，通过相机添加灯光
    //2-2.添加灯光到相机
    this.camera.add(this.light);

    this.resizer = new Resizer(container, this.camera, this.renderer);

    // this.resizer.onResize = () => {
    //   this.render();
    // };

    this.controls = createControls(this.camera, this.renderer.domElement);
    //设置控件对象的位置
    // this.controls.target.set(1, 2, 3);
    //复制对象的位置将控件指向对象
    // this.controls.target.copy(this.cube.position);
    //增加阻尼感
    this.controls.enableDamping = true;
    //改变位置是，渲染一帧，避免非循环状况下出现异常

    // console.log("aspect", this.camera.aspect);

    // next, set the renderer to the same size as our container element
    // this.renderer.setSize(container.clientWidth, container.clientHeight);

    // finally, set the pixel ratio to ensure our scene will look good on mobile devices
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.loop.updateTables.push(
      this.cube,
      this.camera,
      this.controls,
      this.meshGroup,
    );
  }
  addCube() {
    this.scene.add(this.cube);
  }
  addMeshGroup() {
    this.scene.add(this.meshGroup);
  }
  onChangeRender() {
    this.controls.addEventListener("change", () => {
      // console.log("渲染新帧率");
      this.render();
    });
  }
  render() {
    this.scene.add(this.camera);
    this.renderer.render(this.scene, this.camera);
  }

  play() {
    this.controls.animation();
  }

  dispose() {
    // 1. 从场景中移除对象
    this.scene.remove(this.cube, this.light, this.meshGroup);

    // 2. 从 DOM 中移除 renderer 的 canvas
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }

    // 4. 释放 Three.js 资源
    this.renderer.dispose(); // 释放 WebGL 上下文

    // 5. 释放几何体和材质（防止 GPU 内存泄漏）
    this.cube.geometry.dispose();

    //相机无法释放
    //释放相机控件
    this.controls.dispose();

    // 7. 断开引用（帮助 GC）
    this.camera = null!;
    this.renderer = null!;
    this.scene = null!;
    this.cube = null!;
    this.light = null!;
    this.resizer = null!;
    this.controls = null!;
  }

  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}

export { World };
