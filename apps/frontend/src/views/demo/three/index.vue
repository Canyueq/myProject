<template>
  <el-input
    style="width: 200px"
    placeholder="输入创建场景的尺寸"
    v-model="sceneSize"
  />
  <el-button type="success" class="renderButton" @click="handle('0')">
    渲染Scene
  </el-button>
  <el-button type="success" class="renderButton" @click="handle('1')">
    渲染three
  </el-button>
  <el-button type="primary" @click="handle('2')">控制立方体尺寸</el-button>
  <el-button type="primary" @click="handle('4')">控制立方体旋转</el-button>
  <el-button type="danger" @click="handle('3')">销毁</el-button>
  <div ref="containerRef" id="container"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, toRaw } from "vue";
import { World } from "../../../world";
import { Matrix4 } from "three";
import { ElMessage } from "element-plus";

const sceneSize = ref();
const matrix4 = ref<Matrix4>(new Matrix4());
// const containerRef = ref<HTMLElement | null>(null);
let world: World | undefined;
let type = false;
onMounted(() => {
  const renderButton = document.querySelector(".renderButton");
  const root = document.documentElement;
  root.style.setProperty(
    "--button-h",
    renderButton?.clientHeight?.toString() + "px",
  );
});
const main = () => {
  if (!world) return;
  world.render();
};
const initWorld = () => {
  const container: HTMLElement = document.querySelector(
    "#container",
  ) as HTMLElement;
  if (container) {
    world = new World(container, sceneSize.value, toRaw(matrix4.value));
  }
};
const handle = (code: string) => {
  switch (code) {
    case "0": {
      if (world) return;
      initWorld();
      break;
    }
    case "1": {
      if (!world) return;
      world.dispose();
      world = undefined;
      matrix4.value.set(
        0.7071,
        0,
        0.3536,
        -3,
        0,
        1,
        0,
        -3,
        -0.7071,
        0,
        0.3536 * 2,
        -3,
        0,
        0,
        0,
        1,
      );
      initWorld();
      main();
      break;
    }
    case "2": {
      if (!world) return;
      world.dispose();
      world = undefined;
      matrix4.value.set(
        0.5071,
        0,
        0.3536,
        1,
        0,
        4,
        0,
        0,
        -0.5071,
        0,
        0.3536 * 2,
        0,
        0,
        0,
        0,
        1,
      );
      initWorld();
      main();
      break;
    }
    case "3": {
      if (!world) return;
      world.dispose();
      world = undefined;
      main();
      break;
    }
    case "4": {
      if (!world) return;
      console.log("type", type);
      if (!type) {
        type = true;
        ElMessage.success("再次点击停止旋转");
        world.start();
      } else {
        type = false;
        ElMessage.error("停止旋转");
        world.stop();
      }
      break;
    }
  }
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
