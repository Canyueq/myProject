<template>
  <div ref="headerRef" style="margin-left: 10px; color: white">侧边栏</div>
  <el-menu background-color="black" text-color="white" style="width: 100%">
    <aside-menu />
  </el-menu>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import asideMenu from "../components/menu.vue";

const headerRef = ref<HTMLElement | null>(null);
const headerHeight = ref<number | undefined>(0);
onMounted(() => {
  headerHeight.value = headerRef.value?.offsetHeight;
});
</script>

<style lang="scss" scoped></style>
