<template>
  <div
    class="container"
    style="
      width: auto;
      height: 600px;
      justify-content: center;
      align-items: center;
    "
  >
    <el-card style="max-width: 480px; height: 600px">
      <template #header>
        <img
          src="../../public/37.jpg"
          style="max-height: 200px; width: 100%; padding: 0; opacity: 50%"
        />
      </template>
      <div style="display: flex; justify-content: right">
        <el-link @click="type = !type"
          >{{ type ? "没有账号？请先注册" : "登录" }}
        </el-link>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" class="form-style">
        <el-form-item label="用户名:" prop="username" required>
          <el-input placeholder="请输入用户名" v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码:" prop="passWord" required>
          <el-input placeholder="请输入密码" v-model="form.passWord" />
        </el-form-item>
        <el-form-item
          v-if="type"
          label="请再次输入密码:"
          prop="passWordConfirm"
          required
        >
          <el-input placeholder="请确认密码" v-model="form.passWordConfirm" />
        </el-form-item>
        <el-form-item v-if="type" label="请输入邮箱:" style="display: flex">
          <el-input placeholder="" style="flex: 1" />
          <el-button link type="">发送验证码</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button
            type="primary"
            @click="handelSubmit(formRef)"
            style="display: flex; justify-content: center"
          >
            {{ !type ? "登录" : "注册" }}
          </el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { router } from "../../router";
import { api } from "../../api";
import { reactive, ref } from "vue";
import { useUserStore } from "../../store";
import type { FormInstance } from "element-plus";

const userStore = useUserStore();
const formRef = ref<FormInstance>();
const form = reactive({
  username: "",
  passWord: "",
  passWordConfirm: "",
});
const type = ref(false);
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入"));
  } else {
    if (!formRef.value) return;
    rule;
    callback();
  }
};
const rules = reactive({
  username: [
    {
      required: true,
      validator: validatePass,
      trigger: "blur",
    },
  ],
  passWord: [
    {
      required: true,
      validator: validatePass,
      trigger: "blur",
    },
  ],
  passWordConfirm: [
    {
      required: true,
      validator: validatePass,
      trigger: "blur",
    },
  ],
});
let requestEntity = reactive({});
const handelSubmit = (formEl: any) => {
  if (!formEl) return;
  try {
    formEl.validate((valid: Boolean, fields: any) => {
      if (valid) {
        requestEntity = form;
        //如果是注册
        if (type.value) {
          (async () => {
            const res = await api.signup(requestEntity);
            // console.log("注册结果", res);
            switch (res.data.code) {
              case 0: {
                ElMessage.success(`用户${form.username}注册成功`);
                type.value = !type.value;
                break;
              }
              case 1: {
                ElMessage.error(res.data.msg);
                break;
              }
              case 99: {
                ElMessage.error(res.data.msg);
                break;
              }
            }
          })();
        } else {
          (async () => {
            const res = await api.login(requestEntity);
            // console.log("登陆结果", res);
            switch (res.data.code) {
              case 0: {
                userStore.fetchUserInfo();
                userStore.authState = true;
                const token = res.data.data.token;
                localStorage.setItem("user_token", token);
                router.push("/");
                ElMessage.success(`用户${form.username}登录成功`);
                break;
              }
              case 1: {
                ElMessage.error(res.data.msg);
                break;
              }
              case 99: {
                ElMessage.error(res.data.msg);
                break;
              }
            }
          })();
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  } catch (e: any) {
    ElMessage.error("登录失败", e);
  }
};
</script>

<style lang="scss" scoped>
.form-style {
  width: 300px;
  height: 00px;
}
</style>
