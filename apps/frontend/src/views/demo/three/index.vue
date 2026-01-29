<template>
  <el-button type="success" class="renderButton" @click="cutDownRender">
    渲染three
  </el-button>
  <el-button type="primary" @click="contrlLightPositon"
    >控制立方体光源位置</el-button
  >
  <el-button type="danger" @click="destoryWorld">销毁</el-button>
  <div ref="containerRef" id="container"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, toRaw } from "vue";
import { World } from "../../../world";

const lightPositon = ref({ x: 10, y: 10, z: 10 });
// const containerRef = ref<HTMLElement | null>(null);
let world: World | undefined;
onMounted(() => {
  const renderButton = document.querySelector(".renderButton");
  const root = document.documentElement;
  root.style.setProperty(
    "--button-h",
    renderButton?.clientHeight?.toString() + "px",
  );
});
const initWorld = () => {
  const container: HTMLElement = document.querySelector(
    "#container",
  ) as HTMLElement;
  if (container) {
    world = new World(container, toRaw(lightPositon.value));
  }
};
const cutDownRender = () => {
  if (world) return;
  initWorld();
  main();
};
const destoryWorld = () => {
  if (!world) return;
  world.dispose();
  world = undefined;
};
const contrlLightPositon = () => {
  console.log("world", world);
  if (!world) return;
  world.dispose();
  lightPositon.value.x = Math.random() * 10;
  lightPositon.value.y = Math.random() * 10;
  lightPositon.value.z = Math.random() * 10;
  console.log("lightPositon", toRaw(lightPositon.value));
  initWorld();
  main();
};
const main = () => {
  if (!world) return;
  world.render();
};
</script>
<style lang="scss" scoped>
:root {
  --button-h: 0px;
}
.renderButton {
  height: var(--button-h);
}
#container {
  width: 100%;
  height: calc(100vh - var(--button-h));
}
</style>
