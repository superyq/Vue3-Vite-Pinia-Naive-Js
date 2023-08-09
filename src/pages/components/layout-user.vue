<script setup>
import { reactive, h, computed } from "vue";
import { useDialog, NDropdown, NButton } from "naive-ui";
import { useUserStore } from "@/store/user.js";
import { useTagStore } from "@/store/tag.js";
import router from "@/router/index.js";

let userStore = useUserStore();
let tagStore = useTagStore();

// 登录才获取用户信息
userStore.getInfo();
// 获取 用户信息
let avatar = computed(() => {
  if (!!userStore.user?.avatar) {
    return userStore.user.avatar;
  } else {
    return "";
  }
});
let userName = computed(() => {
  if (!!userStore.user?.userName) {
    return userStore.user.userName;
  } else {
    return "";
  }
});

// 下拉选项
let baseOptions = reactive([
  {
    label: "个人信息",
    key: "userinfo",
  },
  {
    label: "修改密码",
    key: "editpassword",
  },
  {
    label: "退出系统",
    key: "logout",
  },
]);

// 选择操作
let dialog = useDialog();
// 确认登出
let submitLogout = () => {
  userStore.logout().then(() => {
    router.push("/home");
    dialog.destroyAll();
    window.location.reload();
  });
};
// 取消登出
let cancelLogOut = () => {
  dialog.destroyAll();
};
let handleSelect = (key, item) => {
  if (["userinfo", "editpassword"].includes(key)) {
    // 新增 tag
    let obj = { title: item.label, key };
    tagStore.addTag(obj);

    router.push(`/${key}`);
  } else {
    dialog.warning({
      closable: false,
      showIcon: false,
      style: {
        width: "20%",
      },
      title: () => {
        return h(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              textAlign: "center",
              height: "40px",
              lineHeight: "40px",
              background: "#cee6f0",
              color: "#1d69a3",
              fontWeight: "bold",
              fontSize: "16px",
            },
          },
          "退出登录"
        );
      },
      content: () => {
        return h(
          "p",
          {
            style: {
              textAlign: "center",
              height: "80px",
              lineHeight: "108px",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bolder",
              userSelect: "none",
            },
          },
          "是否退出当前账号？"
        );
      },
      action: () => {
        return h(
          "div",
          {
            style: {
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            },
          },
          [
            h(
              NButton,
              {
                onClick: cancelLogOut,
                style: {
                  width: "40%",
                },
              },
              {
                default: () => "取消",
              }
            ),
            h(
              NButton,
              {
                onClick: submitLogout,
                type: "info",
                style: {
                  width: "40%",
                },
              },
              {
                default: () => "退出",
              }
            ),
          ]
        );
      },
    });
  }
};
</script>

<template>
  <n-dropdown
    trigger="click"
    :options="baseOptions"
    @select="handleSelect"
    size="small"
  >
    <div class="header-right_user-box">
      <div class="header-right_user-avatar">
        <img v-if="avatar" class="header-right_avatar" :src="avatar" />
        <svg-icon v-else name="avatar" width="35" height="35"></svg-icon>
      </div>
      <div class="header-right_user-name">
        <span>{{ userName }}</span>
        <svg-icon name="down" width="10"></svg-icon>
      </div>
    </div>
  </n-dropdown>
</template>

<style lang="scss" scoped>
.header-right_user-box {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.header-right_user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.header-right_user-name {
  span {
    margin: 0 5px;
  }
}
</style>
