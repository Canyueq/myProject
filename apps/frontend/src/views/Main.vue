<template>
  <el-container style="height: 100%">
    <el-aside style="background-color: black">
      <aside-bar />
    </el-aside>
    <el-container>
      <el-header style="padding: 0">
        <header-bar />
      </el-header>
      <el-main style="padding: 0">
        <router-view />
      </el-main>
      <el-footer style="padding: 0">
        <footer-bar />
      </el-footer>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import headerBar from "../components/header.vue";
import footerBar from "../components/footer.vue";
import asideBar from "../components/aside.vue";
</script>

<style lang="scss" scoped></style>
