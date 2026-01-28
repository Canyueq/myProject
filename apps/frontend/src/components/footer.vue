<template>
  <div class="container" style="justify-content: space-between">
    <div>uid:{{ userStore.uid }}</div>
    <div style="padding: 10px">3</div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "../store";
const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
