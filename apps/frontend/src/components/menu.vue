<template>
  <el-menu-item @click="selectMenu('1')" index="1">
    <el-icon><Menu /></el-icon>
    <span>主界面</span>
  </el-menu-item>
  <el-sub-menu index="2">
    <template #title>
      <el-icon><Document /></el-icon>
      <span>home</span>
    </template>
    <el-sub-menu index="2-1">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>games</span>
      </template>
      <el-menu-item @click="selectMenu('2-1-1')" index="2-1-1">
        <el-icon><Document /></el-icon>
        <span>demo</span>
      </el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
  <el-sub-menu index="3">
    <template #title>
      <el-icon><Document /></el-icon>
      <span>demo</span>
    </template>
    <el-menu-item @click="selectMenu('3-1')" index="3-1">
      <el-icon><Document /></el-icon>
      <span>canvas</span>
    </el-menu-item>
    <el-menu-item @click="selectMenu('3-2')" index="3-2">
      <el-icon><Document /></el-icon>
      <span>three</span>
    </el-menu-item>
  </el-sub-menu>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Document, Menu } from "@element-plus/icons-vue";

const router = useRouter();
const selectMenu = (index: string) => {
  switch (index) {
    case "1": {
      router.push("/");
      break;
    }
    case "2": {
      console.log("home");
      router.push("/home");
      break;
    }
    case "2-1": {
      console.log("games");
      router.push({ name: "Games" });
      break;
    }
    case "2-1-1": {
      console.log("demo");
      router.push("/home/games/demo");
      break;
    }
    case "3": {
      router.push("/demo");
      break;
    }
    case "3-1": {
      console.log("canvas");
      router.push("/demo/canvas");
      break;
    }
    case "3-2": {
      router.push("/demo/three");
      break;
    }
  }
};
</script>
<style lang="scss" scoped></style>
