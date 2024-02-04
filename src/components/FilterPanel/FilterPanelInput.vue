<template>
  <input
    v-model="model"
    class="dark:text-gray-300 dark:focus:bg-sky-800/20 focus:bg-sky-100/50
    form-input-border focus-visible:form-input-outline form-input-bg form-input-text-colour"
    :type="$props.type"
    :placeholder="$props.placeholder"
  >
</template>

<script setup lang="ts">
import type { InputTypeHTMLAttribute, PropType } from 'vue';

defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<InputTypeHTMLAttribute>,
    default: 'text',
  },
});
const model = defineModel<string>();
</script>
