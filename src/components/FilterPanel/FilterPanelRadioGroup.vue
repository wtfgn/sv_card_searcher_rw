<template>
  <RadioGroup v-model="selectedOption">
    <div class="flex flex-col w-full">
      <RadioGroupLabel class="block text-lg mb-2 font-medium truncate" :class="{ 'text-gray-300': isDark }">
        {{ props.label }}
      </RadioGroupLabel>

      <div :class="props.optionsContainerClass">
        <RadioGroupOption
          v-for="option in props.options"
          :key="option.name"
          v-slot="{ active, checked }"
          as="template"
          :value="option"
        >
          <slot name="option" :option="option" :active="active" :checked="checked">
            <div
              :class="[
                active
                  ? isDark ? 'form-input-outline-dark'
                    : 'form-input-outline-light'
                  : '',
                checked
                  ? isDark ? 'bg-sky-800/20 form-input-outline-dark'
                    : 'bg-sky-100/50 form-input-outline-light'
                  : '',
                isDark ? 'form-input-border-dark form-input-bg-dark form-input-text-colour-dark'
                : 'form-input-border-light form-input-bg-light form-input-text-colour-light',
              ]"
              class="relative flex-1 cursor-pointer rounded-lg pl-3 py-2 pr-4 truncate transition-colors"
            >
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center">
                  <div class="text-lg">
                    <RadioGroupLabel
                      as="p"
                      :class="checked
                        ? isDark ? 'dark:text-sky-300' : 'text-sky-900'
                        : isDark ? 'dark:text-gray-300' : 'text-gray-900'
                      "
                      class="font-medium"
                    >
                      {{ option.name }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      :class="checked
                        ? isDark ? 'text-sky-400' : 'text-sky-500'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                      "
                      class="inline text-sm"
                    >
                    <!-- <span aria-hidden="true">  </span> -->
                    </RadioGroupDescription>
                  </div>
                </div>
                <div v-show="checked" class="shrink-0">
                  <CheckIcon
                    :class="isDark ? 'text-sky-300' : 'text-sky-600'"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </slot>
        </RadioGroupOption>
      </div>
    </div>
  </RadioGroup>
</template>

<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue';
import type { PropType } from 'vue';
import { CheckIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import type { CardProperty } from '@/types/card';
import { useUserStore } from '@/stores/user';

const props = defineProps({
  options: {
    type: Array as PropType<CardProperty[]>,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  optionsContainerClass: {
    type: String,
    default: 'flex flex-col space-y-4',
  },
});

const selectedOption = defineModel<CardProperty>();
const userStore = useUserStore();
const { isDark } = storeToRefs(userStore);
</script>
