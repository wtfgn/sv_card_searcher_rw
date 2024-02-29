import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { LangaugeType } from '../types/user';

export const useUserStore = defineStore('user', () => {
  const isDark = ref(false);
  const language = ref<LangaugeType>('en');

  const switchTheme = () => {
    isDark.value = !isDark.value;
  };

  const setTheme = (theme: boolean) => {
    isDark.value = theme;
  };

  return {
    isDark,
    switchTheme,
    language,
    setTheme,
  };
});
