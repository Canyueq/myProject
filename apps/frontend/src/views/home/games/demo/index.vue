<template>
  <div ref="containerRef" class="demo">
    游戏demo
    <div></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const containerRef = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
</script>
<style lang="scss" scoped></style>
