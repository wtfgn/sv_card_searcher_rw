<template>
  <div class="flex flex-col space-y-6">
    <div>
      <h1 class="text-4xl font-bold text-slate-800 dark:text-white">
        Welcome to Shadowverse Helper
      </h1>
      <p class="mt-2 text-lg text-slate-700 dark:text-slate-300">
        Shadowverse Helper is a website that helps you build decks for the Shadowverse card game, even though it's not a very good game.
      </p>
    </div>

    <div class="flex flex-col lg:space-y-8 space-y-6 px-8">
      <GradientColourBase class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg rounded-lg p-6">
        <template #default>
          <h2 class="text-2xl font-bold text-white">
            Card Searcher
          </h2>
          <p class="mt-2 text-lg text-white">
            Search for cards by name, type, or other attributes. Find the perfect cards for your deck.
          </p>
        </template>
      </GradientColourBase>

      <GradientColourBase class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg rounded-lg p-6">
        <template #default>
          <h2 class="text-2xl font-bold text-white">
            Deck Builder
          </h2>
          <p class="mt-2 text-lg text-white">
            Build your deck by adding cards from the card searcher. Save your deck to your account and share it with your friends.
          </p>
        </template>
      </GradientColourBase>
    </div>
  </div>
</template>

<script setup lang="ts">
import GradientColourBase from '@/components/Styles/GradientColourBase.vue';
</script>
