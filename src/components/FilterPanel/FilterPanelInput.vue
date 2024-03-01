<template>
  <input
    v-model="model"
    :disabled="$props.disabled"
    :class="styleClasses"
    class="disabled:cursor-not-allowed transition-colors "
    :type="$props.type"
    :placeholder="$props.placeholder"
    :required="$props.required"
  >
</template>

<script setup lang="ts">
import { type InputTypeHTMLAttribute, type PropType, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<InputTypeHTMLAttribute>,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
const model = defineModel<string>();
const userStore = useUserStore();
const { isDark } = storeToRefs(userStore);

const styleClasses = computed(() =>
  isDark.value
    ? 'form-input-border-dark form-input-bg-dark form-input-text-colour-dark focus-visible:form-input-outline-dark focus:bg-sky-800/20 disabled:bg-gray-700 disabled:text-gray-300"'
    : 'form-input-border-light focus-visible:form-input-outline-light form-input-bg-light form-input-text-colour-light focus:bg-sky-100/50 disabled:bg-gray-200 disabled:text-gray-800',
);
</script>
