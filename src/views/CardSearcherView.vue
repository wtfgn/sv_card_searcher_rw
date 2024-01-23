<template>
  <div class="dark:bg-slate-900 p-6 h-screen">
    <h1 class="text-3xl mb-4 dark:text-white font-semibold">
      Card Searcher
    </h1>

    <div class="mb-4">
      <FilterPanelSearchBar
        v-model="searchQuery"
        class="w-full p-2 rounded text-lg transition-float"
        placeholder="Search for a card"
      />
    </div>

    <FilterPanel />

    <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card v-for="card in filteredCards" :key="card.id" :card="card" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import FilterPanel from '@/components/FilterPanel/FilterPanel.vue';
import FilterPanelSearchBar from '@/components/FilterPanel/FilterPanelSearchBar.vue';

// import Card from '@/components/Card/Card.vue';

// // Mock data
// const cards = [
//   // Add your card data here
// ];

const searchQuery = ref('');

// const filteredCards = computed(() => {
//   if (!searchQuery.value)
//     return cards;
//   return cards.filter(card => card.name.includes(searchQuery.value));
// });
</script>
