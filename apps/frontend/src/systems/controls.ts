import type { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
interface MyControls extends OrbitControls {
  tick: Function;
  animation: Function;
}
function createControls(camera: Camera, canvas: HTMLElement) {
  const controls = new OrbitControls(camera, canvas) as MyControls;
  controls.tick = () => {
    controls.update();
  };
  controls.animation = () => {
    console.log("调用animation");
    //启动自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1000;
    controls.update();
  };
  controls.listenToKeyEvents(window);
  //控件和相机最小距离
  controls.minDistance = 10;
  //最大距离
  controls.maxDistance = 100;
  controls.update();
  //如果max = min 相机将不能移动

  //保留
  controls.saveState();
  //重置至保留位置
  controls.reset();
  return controls;
}
export { createControls };
export type { MyControls };
