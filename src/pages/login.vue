<script setup>
import cookie from "js-cookie";
import { ref, reactive } from "vue";
import { NButton, NInput, NForm, NFormItem, NCheckbox } from "naive-ui";
import router from "@/router/index.js";
import { useUserStore } from "@/store/user.js";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { getCodeImg } from "@/api/login.js";
 
import CopeRight from "@/components/CopyRight.vue";
 
// 用户状态管理
let userStore = useUserStore();
 
// 是否需要验证码
let needCode = ref(false);
let codeUrl = ref("");
// 获取图形验证码
function getCode() {
  getCodeImg().then((res) => {
    needCode.value =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (needCode.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      form.uuid = res.uuid;
    }
  });
}
// getCode(); // 需要获取验证码，自己取消注释
 
// 登录
let formRef = ref(null);
let form = reactive({
  username: "admin",
  password: "admin123",
  code: "",
  uuid: "",
});
let rules = {
  username: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入用户名",
  },
  password: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入密码",
  },
  code: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入验证码",
  },
};
let rememberMe = ref(false);
let loginBtnState = ref(false);
let handleLogin = () => {
  loginBtnState.value = true;
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (rememberMe.value) {
        cookie.set("username", form.username, { expires: 30 });
        cookie.set("password", encrypt(form.password), { expires: 30 });
        cookie.set("rememberMe", rememberMe.value, { expires: 30 });
      } else {
        cookie.remove("username");
        cookie.remove("password");
        cookie.remove("rememberMe");
      }
 
      userStore
        .login(form)
        .then(() => {
          window.$msg.success("登录成功");
          router.push({ name: "home" });
        })
        .catch(() => {
          loginBtnState.value = false;
          getCode();
        });
    } else {
      loginBtnState.value = false;
    }
  });
};
 
// 获取默认登录账号
function getCookie() {
  form.username = cookie.get("username") || "";
  form.password = decrypt(cookie.get("password")) || "";
  rememberMe.value = Boolean(cookie.get("rememberMe")) || false;
}
// getCookie(); // 需要记住密码，自己取消注释
</script>
 
<template>
  <div class="login-bg c-center">
    <div class="login__box">
      <div class="login-logo__box">
        <div class="login__title login-logo">
          登 录
        </div>
      </div>
      <n-form
        ref="formRef"
        class="login-form__box"
        :model="form"
        :rules="rules"
        label-placement="left"
      >
        <n-form-item path="username">
          <n-input
            class="login-input"
            v-model:value="form.username"
            placeholder="请输入用户名/手机号"
          >
            <template #prefix>
              <svg-icon name="username" color="grey"></svg-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            class="login-input"
            v-model:value="form.password"
            placeholder="请输入密码"
            type="password"
            show-password-on="mousedown"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <svg-icon name="password" color="grey"></svg-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item v-if="needCode" class="login-code" path="code">
          <n-input
            v-model:value="form.code"
            class="login-input login-input_code"
            placeholder="验证码"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <svg-icon name="code" color="grey"></svg-icon>
            </template>
          </n-input>
          <img class="login-code-img" :src="codeUrl" @click="getCode" />
        </n-form-item>
        <div class="login-checkbox_box">
          <n-checkbox
            class="login-checkbox"
            v-model:checked="rememberMe"
          ></n-checkbox>
          <span>记住密码</span>
        </div>
        <n-button
          class="login-btn_login"
          type="info"
          @click="handleLogin"
          :loading="loginBtnState"
          :disabled="loginBtnState"
          >登录</n-button
        >
      </n-form>
      <!-- <div class="login-btn_forget" @click="handleForget">忘记密码 ？</div> -->
    </div>
    <cope-right></cope-right>
  </div>
</template>
 
<style lang="scss">
.n-form-item {
  margin-top: -20px;
}
</style>
 
<style lang="scss" scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/imgs/login_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  .login__box {
    width: 425px;
    padding: 20px 40px;
    border-radius: 10px;
    background: rgba(2, 57, 104, 0.7);
    box-shadow: 0 0 30px rgba(2, 57, 104, 0.7);
    box-sizing: border-box;
    .login__title {
      font-size: 24px;
      text-align: center;
      color: #fff;
    }
  }
}
 
.login-title {
  margin-bottom: 15px;
  text-align: center;
  letter-spacing: 10px;
  font-size: 18px;
  color: #fff;
  opacity: 1;
}
 
.login-logo__box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
 
  text {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    color: #1d69a3;
 
    &::before {
      content: "";
      display: inline-block;
      margin: 0 5px;
      width: 5px;
      height: 5px;
      background: gray;
      border-radius: 50%;
    }
  }
}
 
.login-logo {
  width: 55%;
 
  img {
    width: 100%;
    object-fit: cover;
  }
}
 
.login-code {
  .login-input_code {
    width: 240px;
  }
 
  .login-btn_code {
    color: #fff;
    margin-left: 20px;
  }
}
 
.login-btn_login {
  height: 40px;
  width: 100%;
}
 
.login-input {
  margin-top: 20px;
}
 
.login-checkbox_box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: -16px 0 10px;
  color: #71a1c5;
  font-size: 12px;
}
 
.login-checkbox {
  margin-right: 5px;
}
 
.login-btn_forget {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #71a1c5;
  cursor: pointer;
}
 
.login-code-img {
  margin-top: 20px;
  width: 30%;
  height: 35px;
  margin-left: 20px;
  object-fit: contain;
  cursor: pointer;
}
</style>