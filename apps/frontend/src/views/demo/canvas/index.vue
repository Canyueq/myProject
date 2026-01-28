<template>
  <!-- <h1>Discoverthreejs.com - Nothing to see here yet :)</h1> -->
  <div id="scene-container"></div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
onMounted(() => {
  //通过id获取容器元素
  const container = document.querySelector("#scene-container");
  if (!container) return; //防止null

  const scene = new Scene(); //创建场景
  scene.background = new Color("green"); //设置场景颜色
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane

  const camera = new PerspectiveCamera(fov, aspect, near, far); //创建相机初始化相机位置
  camera.position.set(0, 0, 10);

  const geometry = new BoxGeometry(2, 2, 2); //创建集合体

  const material = new MeshBasicMaterial(); //创建材质（默认白色）

  //创建一个几何体（mesh）需要传入集合和材质作为构造参数
  const cube = new Mesh(geometry, material);

  scene.add(cube); // 添加几何体到场景中

  const renderer = new WebGLRenderer(); // 创建渲染器

  //设置渲染器的尺寸，保持和容器一样
  renderer.setSize(container.clientWidth, container.clientHeight);

  // finally, set the pixel ratio so that our scene will look good on HiDPI displays
  //设置像素比,这是防止 HiDPI 显示器模糊所必需的
  renderer.setPixelRatio(window.devicePixelRatio);

  // add the automatically created <canvas> element to the page
  //在容器中创建一个动态的canvas
  container.append(renderer.domElement);

  // render, or 'create a still image', of the scene
  renderer.render(scene, camera);
});
</script>
<style lang="scss" scoped>
#scene-container {
  /* tell our scene container to take up the full page */
  flex: 1;
  width: 100%;
  height: 100%;
  /*
    Set the container's background color to the same as the scene's
    background to prevent flashing on load
  */
  background-color: skyblue;
}
</style>
