import { defineStore } from "pinia";
 
export const useTagStore = defineStore({
  id: "tag",
  state: () => {
    return {
      tags: [{ title: "首页", key: "home" }],
      activeTagIndex: 0,
    };
  },
  getters: {
    tagsKey(state) {
      let arr = [];
      state.tags.map((tag) => {
        arr.push(tag.key);
      });
      return arr;
    },
  },
  actions: {
    addTag(tag) {
      if (!this.tagsKey.includes(tag.key)) {
        this.tags.push(tag);
      }
    },
    removeTag(key) {
      let index = this.tagsKey.indexOf(key);
      this.tags.splice(index, 1);
      this.activeTagIndex = index - 1;
    },
  },
});