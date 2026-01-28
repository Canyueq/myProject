<template>
  <div>获取当前登录用户信息</div>
  <el-button @click="getUserInfo">获取</el-button>
  <div>{{ userInfo }}</div>
  <div>{{ console.log(router.getRoutes()) }}</div>
  <router-view />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../../store";
import type { UserInfo } from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const userInfo = ref<UserInfo>();
const getUserInfo = () => {
  userInfo.value = userStore.userInfo;
  setTimeout(() => {
    userInfo.value = {} as UserInfo;
  }, 1000);
};
</script>

<style lang="scss" scoped></style>
