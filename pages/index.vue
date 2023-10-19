<script lang="ts" setup>
//meta title
useHead({
  title: "Anime Weebs App",
});

const route = useRoute();
//init config
const config = useRuntimeConfig();

//fetch data from API with "useAsyncData"
const { data: ongoing }: any = await useAsyncData("ongoing", () => $fetch(`${config.public.apiBase}/seasons/now?filter=tv`));

const { data: upcoming }: any = await useAsyncData("upcoming", () => $fetch(`${config.public.apiBase}/seasons/upcoming`));
</script>

<template>
  <div class="py-32 bg-primary_dark">
    <div class="container">
      <!-- Highlight -->
      <div class="flex justify-between">
        <h1 class="text-secondary font-semibold text-xl mb-3">Current Season Anime</h1>
        <NuxtLink to="/season/" class="text-secondary font-semibold text-xl mb-3">View All</NuxtLink>
      </div>

      <animeList :animeList="ongoing.data" />

      <div class="flex justify-between mt-20">
        <h1 class="text-secondary font-semibold text-xl mb-3">Upcoming Anime</h1>
        <NuxtLink to="/upcoming/" class="text-secondary font-semibold text-xl mb-3">View All</NuxtLink>
      </div>

      <animeList :animeList="upcoming.data" />
    </div>
  </div>
</template>

<style scoped></style>
