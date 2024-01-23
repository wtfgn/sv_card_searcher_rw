<template>
  <div class="flex flex-col space-y-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <div>
      <h1 class="text-4xl font-bold text-slate-800 dark:text-white">
        Welcome to Shadowverse Helper
      </h1>
      <p class="mt-2 text-lg text-slate-700 dark:text-slate-300">
        Shadowverse Helper is a website that helps you build decks for the Shadowverse card game, even though it's not a very good game.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <HomeFeatureCard class="p-6">
        <template #title>
          Card Searcher
          <CardPickIcon class="inline-block h-6 w-6 ml-2 text-white" />
        </template>
        <template #description>
          Search for cards by name, type, or other attributes. Find the perfect cards for your deck.
        </template>
        <template #button>
          <HomeFeatureCardDirectButton to="/card_searcher" class="px-4 py-2 mt-4">
            Go to Card Searcher
          </HomeFeatureCardDirectButton>
        </template>
      </HomeFeatureCard>

      <HomeFeatureCard class="p-6">
        <template #title>
          Deck Builder
          <HammerIcon class="inline-block h-6 w-6 ml-2 text-white" />
        </template>
        <template #description>
          Build your deck by adding cards from the card searcher. Save your deck to your account and share it with your friends.
        </template>
        <template #button>
          <HomeFeatureCardDirectButton to="/deck_builder" class="px-4 py-2 mt-4">
            Go to Deck Builder
          </HomeFeatureCardDirectButton>
        </template>
      </HomeFeatureCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import CardPickIcon from '@/components/Icons/CardPickIcon.vue';
import HammerIcon from '@/components/Icons/HammerIcon.vue';
import HomeFeatureCard from '@/components/Home/HomeFeatureCard.vue';
import HomeFeatureCardDirectButton from '@/components/Home/HomeFeatureCardDirectButton.vue';
</script>
