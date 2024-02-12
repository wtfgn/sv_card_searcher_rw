<template>
  <div class="relative">
    <!-- Image -->
    <div class="relative w-[215px] h-[280px]">
      <span
        v-if="isLoading"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Spinner class="h-12 w-12 text-sky-600 dark:text-sky-400" />
      </span>
      <img
        v-else
        :src="imageUrl"
        :alt="props.card.card_name || 'Card Image'"
        class="relative top-0 left-0 w-full h-full"
      >

      <!-- Card Name -->
      <div
        class="absolute top-[31px] w-[132px] h-[18px]"
        :class="nameSpaceSizeClass"
      >
        <img
          :src="cardNameImgUrl"
          :alt="props.card.card_name || 'Card Name'"
          class="h-full mx-auto my-0"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useImage } from '@vueuse/core';
import Spinner from '../Icons/Spinner.vue';
import type { Card } from '@/types/card';
import { useUserStore } from '@/stores/user';

const props = defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true,
  },
});

const userStore = useUserStore();
const { language } = storeToRefs(userStore);

const imageUrl = computed(() => `https://shadowverse-portal.com/image/card/phase2/common/C/C_${props.card.card_id}.png`);
const cardNameImgUrl = computed(() => `https://shadowverse-portal.com/image/card/phase2/${language.value}/N/N_${props.card.card_id}.png`);
const nameSpaceSizeClass = computed(() =>
  (props.card.card_name?.length || 0) <= 11 ? 'left-[40px]' : 'left-[50px]',
);
const { isLoading } = useImage({
  src: imageUrl.value,
});
</script>
