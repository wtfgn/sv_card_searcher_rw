<template>
  <li>
    <RouterLink
      :to="to"
      class="relative text-base font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-400 tracking-[1px]
       after:absolute after:content-[''] after:rounded-xl  after:bg-sky-400 dark:after:bg-sky-500
       after:h-[3px] after:-bottom-[5px]  after:left-0
       duration-300 after:transition-all hover:after:w-full"
      :class="{ 'text-slate-900 dark:text-slate-400 after:w-full': isActive, 'after:w-[0%]': !isActive }"
    >
      <slot />
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import type { PropType } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  to: {
    type: Object as PropType<RouteLocationRaw>,
    required: true,
  },
});

const route = useRoute();

const isActive = computed(() => {
  return route.matched.some(record => record.path === props.to);
});
</script>

<style scoped>
</style>
