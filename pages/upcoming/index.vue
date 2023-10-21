<script lang="ts" setup>
import { IconStarFilled } from "@tabler/icons-vue";
//meta title
useHead({
  title: "Anime Weebs App",
});

const route = useRoute();
//init config
const config = useRuntimeConfig();

const page = ref(1);
const filter = ref("tv");

const url = computed(() => {
  return `/api/anime/upcoming?filter=${filter.value}&page=${page.value}`;
});

//fetch data from API with "useAsyncData"
const { pending, data: ongoing }: any = await useFetch(url, {
  lazy: true,
});
</script>

<template>
  <div class="py-32 bg-primary_white min-h-screen">
    <div class="container">
      <!-- Highlight -->
      <div class="flex justify-between">
        <h1 class="text-deep_blue font-semibold text-2xl mb-5 capitalize">Upcoming Anime</h1>
      </div>
      <div class="grid grid-cols-2 gap-5 lg:grid-cols-5" v-if="pending">
        <AnimeCardPlaceholder v-for="index in 20" :key="index" />
      </div>
      <div v-else>
        <div class="grid grid-cols-2 lg:grid-cols-5 text-secondary gap-6">
          <NuxtLink v-for="anime in ongoing.data" :key="anime.mal_id" :to="`/anime/${anime.mal_id}`" class="rounded-lg shadow-lg bg-white relative group overflow-hidden">
            <div v-if="anime.year" class="absolute top-0 left-0 text-center bg-yellow-600 text-sm rounded-br-md text-white p-1 flex items-center gap-2 capitalize">
              {{ anime.season }} {{ anime.year }}
            </div>
            <img class="object-cover w-full h-80 rounded-lg" :src="anime.images['webp'].large_image_url" alt="Anime Image" />
            <div class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-80 text-white p-2 transition duration-300 opacity-0 group-hover:opacity-100">
              {{ anime.titles[0].title }}
            </div>
          </NuxtLink>
        </div>
      </div>
      <div v-if="ongoing.pagination" class="flex justify-center items-center text-black my-8 space-x-4">
        <button @click="page--" :disabled="page === 1" class="bg-deep_blue w-24 hover:bg-primary_light text-white font-semibold py-1 rounded transition duration-300 ease-in-out">Previous</button>
        <div class="flex items-center">
          <span class="mr-2">&nbsp;{{ page }}&nbsp; / &nbsp;{{ ongoing.pagination.last_visible_page }}</span>
        </div>
        <button
          @click="page++"
          :disabled="page === ongoing.pagination.last_visible_page"
          class="bg-deep_blue hover:bg-primary_light w-24 text-white font-semibold py-1 rounded transition duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
