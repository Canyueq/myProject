import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "../api/index";

export interface UserInfo {
  id: number;
  user_name: string;
}

export const useUserStore = defineStore("useUserStore", () => {
  const userInfo = ref<UserInfo>();
  //登录状态
  const uid = computed(() => 10000 + (userInfo.value?.id ?? 0));
  const authState = ref(false);
  const token = computed(() => localStorage.getItem("user_token"));
  const fetchUserInfo = async () => {
    if (!token.value) return;
    try {
      const res = await api.getUserInfo();
      console.log(res);
      userInfo.value = res.data.data;
      authState.value = true;
    } catch (e: any) {
      ElMessage.error("token失效", e);
    }
  };
  return {
    userInfo,
    uid,
    authState,
    token,
    fetchUserInfo,
  };
});
