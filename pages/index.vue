<script lang="ts" setup>
//meta title
useHead({
  title: "Anime Weebs App",
});

const route = useRoute();
//init config
const config = useRuntimeConfig();

const isMobile = computed(() => {
  return window.innerWidth <= 768;
});

//fetch data from API with "useAsyncData"
const { pending, data: ongoing, refresh }: any = await useLazyFetch(`${config.public.apiBase}/seasons/now?filter=tv`);

const { pending: pending1, data: upcoming, refresh: refresh1 }: any = await useLazyFetch(`${config.public.apiBase}/seasons/upcoming`);
</script>

<template>
  <div>
    <div class="py-32 bg-primary_white">
      <div class="container">
        <!-- Highlight -->

        <div class="flex justify-between">
          <h1 class="text-deep_blue font-semibold text-xl mb-3">Current Season Anime</h1>
          <NuxtLink to="/season/" class="text-deep_blue font-semibold mb-3 hover:text-gray-300">View All</NuxtLink>
        </div>
        <div class="grid grid-cols-2 gap-5 lg:grid-cols-6" v-if="pending">
          <AnimeCardPlaceholder v-for="index in isMobile ? 2 : 6" :key="index" />
        </div>
        <div v-else>
          <animeList :animeList="ongoing?.data" @refresh-data="refresh" />
        </div>
        <div class="flex justify-between mt-20">
          <h1 class="text-deep_blue font-semibold text-xl mb-3">Upcoming Anime</h1>
          <NuxtLink to="/upcoming/" class="text-deep_blue font-semibold mb-3 hover:text-gray-300">View All</NuxtLink>
        </div>
        <div class="grid grid-cols-2 gap-3 lg:grid-cols-6" v-if="pending1">
          <AnimeCardPlaceholder v-for="index in isMobile ? 2 : 6" :key="index" />
        </div>
        <div v-else>
          <animeList :animeList="upcoming?.data" @refresh-data="refresh1" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
