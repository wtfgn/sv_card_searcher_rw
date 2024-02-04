<template>
  <Listbox v-model="selectedOptions" :horizontal="props.horizontal" :multiple="props.multiple">
    <div class="relative mt-1">
      <ListboxLabel class="block text-lg mb-2 dark:text-gray-300 font-medium truncate">
        {{ props.label }}
      </ListboxLabel>

      <ListboxButton
        class="relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left sm:text-sm
        form-input-border focus-visible:form-input-outline form-input-bg form-input-text-colour"
      >
        <span
          class="text-lg block truncate"
          :class="[
            isNoSelectedOptions ? 'text-gray-400' : 'text-gray-900',
            isDark ? 'dark:text-gray-300' : '',
            isDark && isNoSelectedOptions ? 'dark:text-gray-400' : '',
          ]"
        >
          {{ slectedOptionsFormatted }}
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1  focus:outline-none sm:text-sm
          dark:bg-gray-700 dark:ring-gray-800 flex ring-black/5 z-10"
          :class="[$props.horizontal ? 'flex-row' : 'flex-col', optionsContainerClass]"
        >
          <ListboxOption
            v-for="option in props.options"
            v-slot="{ active, selected }"
            :key="option.id"
            :value="option"
            as="template"
          >
            <slot name="option" :option="option" :active="active" :selected="selected" :is-dark="isDark" :horizontal="props.horizontal">
              <li
                class="relative cursor-default select-none py-2 flex" :class="[
                  active ? 'bg-sky-100 text-sky-900' : 'text-gray-900',
                  isDark ? 'dark:text-gray-300 dark:bg-gray-700' : '',
                  isDark && active ? 'dark:bg-sky-800 dark:text-sky-100' : '',
                  horizontal ? 'flex-1 px-4 justify-center' : 'w-full pl-10 pr-4',
                ]"
              >
                <span
                  class="block truncate" :class="[
                    selected ? 'font-medium' : 'font-normal',
                    horizontal ? 'text-center' : '',
                  ]"
                >{{ option.name }}</span>
                <span
                  v-if="selected"
                  class="inset-y-0 left-0 flex items-center pl-3 text-sky-600 dark:text-sky-300"
                  :class="horizontal ? 'right-0' : 'absolute'"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </slot>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import type { PropType } from 'vue';
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
  horizontal: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  optionsContainerClass: {
    type: String,
    default: '',
  },
});

const userStore = useUserStore();
const { isDark } = storeToRefs(userStore);
const selectedOptions = defineModel<CardProperty | Array<CardProperty>>();

const isNoSelectedOptions = computed(() => {
  if (Array.isArray(selectedOptions.value))
    return selectedOptions.value.length === 0;
  return !selectedOptions.value;
});

const slectedOptionsFormatted = computed(() => {
  if (isNoSelectedOptions.value)
    return 'Select an option';
  if (Array.isArray(selectedOptions.value))
    return selectedOptions.value.map(option => option.name).join(', ');

  return selectedOptions.value?.name;
});
</script>
