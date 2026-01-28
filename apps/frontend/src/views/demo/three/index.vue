<template>
  <el-button type="success" class="renderButton" @click="cutDownRender">
    渲染three
  </el-button>
  <div id="container"></div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { World } from "../../../world";

onMounted(() => {
  const renderButton = document.querySelector(".renderButton");
  const root = document.documentElement;
  root.style.setProperty(
    "--button-h",
    renderButton?.clientHeight?.toString() + "px",
  );
});

const cutDownRender = () => {
  main();
};
const main = () => {
  const container: HTMLElement | null = document.querySelector("#container");
  if (!container) return;
  const world = new World(container);
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
