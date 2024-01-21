<template>
  <div :class="`bg-gradient-to-r ${gradientColors}`">
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const preSetGradientColors = [
  'from-purple-400 via-pink-500 to-red-500 dark:from-purple-700 dark:via-pink-800 dark:to-red-800',
  'from-green-400 via-blue-500 to-indigo-500 dark:from-green-700 dark:via-blue-800 dark:to-indigo-800',
  'from-yellow-400 via-red-500 to-pink-500 dark:from-yellow-700 dark:via-red-800 dark:to-pink-800',
  'from-blue-400 via-purple-500 to-pink-500 dark:from-blue-700 dark:via-purple-800 dark:to-pink-800',
  'from-yellow-400 via-green-500 to-blue-500 dark:from-yellow-700 dark:via-green-800 dark:to-blue-800',
  'from-red-400 via-yellow-500 to-green-500 dark:from-red-700 dark:via-yellow-800 dark:to-green-800',
  'from-pink-400 via-red-500 to-yellow-500 dark:from-pink-700 dark:via-red-800 dark:to-yellow-800',
  'from-indigo-400 via-blue-500 to-green-500 dark:from-indigo-700 dark:via-blue-800 dark:to-green-800',
  'from-pink-400 via-purple-500 to-blue-500 dark:from-pink-700 dark:via-purple-800 dark:to-blue-800',
  'from-green-400 via-yellow-500 to-red-500 dark:from-green-700 dark:via-yellow-800 dark:to-red-800',
];

const gradientColors = ref(preSetGradientColors[Math.floor(Math.random() * preSetGradientColors.length)]);
</script>
