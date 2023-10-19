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
  <div class="py-16 bg-primary_dark min-h-screen">
    <div class="container">
      <!-- Highlight -->
      <div v-if="pending"><span class="text-white text-2xl">Loading ...</span></div>
      <div v-else>
        <div class="flex justify-between">
          <h1 class="text-secondary font-semibold text-2xl mb-5 capitalize">Upcoming Anime</h1>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-5 text-secondary gap-6">
          <NuxtLink v-for="anime in ongoing.data" :key="anime.mal_id" :to="`/anime/${anime.mal_id}`" class="rounded-lg bg-white relative group overflow-hidden">
            <div v-if="anime.score" class="absolute top-0 left-0 text-center bg-yellow-600 text-sm text-white p-1 flex items-center gap-2"><IconStarFilled size="12" />{{ anime.score }}</div>
            <img class="object-cover w-full h-80 rounded-lg" :src="anime.images['webp'].large_image_url" alt="Anime Image" />
            <div class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-80 text-white p-2 transition duration-300 opacity-0 group-hover:opacity-100">
              {{ anime.titles[0].title }}
            </div>
          </NuxtLink>
        </div>
        <div v-if="ongoing.pagination" class="flex justify-center items-center text-secondary my-4 space-x-4">
          <button @click="page--" :disabled="page === 1" class="bg-primary hover:bg-primary_light text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">Previous</button>
          <div class="flex items-center">
            <span class="mr-2">Page &nbsp;{{ page }}&nbsp; from &nbsp;{{ ongoing.pagination.last_visible_page }}</span>
          </div>
          <button
            @click="page++"
            :disabled="page === ongoing.pagination.last_visible_page"
            class="bg-primary hover:bg-primary_light text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
