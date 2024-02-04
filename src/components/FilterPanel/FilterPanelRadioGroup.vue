<template>
  <RadioGroup v-model="selectedOption">
    <div class="flex flex-col w-full">
      <RadioGroupLabel class="block text-lg mb-2 dark:text-gray-300 font-medium truncate">
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
                active ? ' form-input-outline' : '',
                checked ? 'dark:bg-sky-800/20 bg-sky-100/50 form-input-outline' : 'bg-white ',
              ]"
              class="relative flex-1 cursor-pointer rounded-lg pl-3 py-2 pr-4 form-input-border form-input-bg form-input-text-colour truncate"
            >
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center">
                  <div class="text-lg">
                    <RadioGroupLabel
                      as="p"
                      :class="checked ? ' text-sky-900 dark:text-sky-300' : 'text-gray-900 dark:text-gray-300'"
                      class="font-medium"
                    >
                      {{ option.name }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      :class="checked ? ' text-sky-500 dark:text-sky-400' : 'text-gray-500 dark:text-gray-400'"
                      class="inline text-sm"
                    >
                    <!-- <span aria-hidden="true">  </span> -->
                    </RadioGroupDescription>
                  </div>
                </div>
                <div v-show="checked" class="shrink-0">
                  <CheckIcon
                    class="h-5 w-5 text-sky-600 dark:text-sky-300"
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
import type { CardProperty } from '@/types/card';

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
</script>
