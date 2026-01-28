<template>
  <div
    class="container"
    style="justify-content: space-between; background-color: black"
  >
    <div></div>
    <div style="margin-right: 10px">
      <el-button type="primary" @click="handleExit">退出</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { router } from "../router/index";
const handleExit = () => {
  router.push("/login");
};
</script>

<style lang="scss" scoped></style>
