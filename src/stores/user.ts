import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const isDark = ref(false);

  const switchTheme = () => {
    isDark.value = !isDark.value;
  };

  return {
    isDark,
    switchTheme,
  };
});
