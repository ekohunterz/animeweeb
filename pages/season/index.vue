<script lang="ts" setup>
import { IconStarFilled, IconAdjustmentsHorizontal } from "@tabler/icons-vue";

const route = useRoute();
//init config
const config = useRuntimeConfig();

const page = ref(1);
const filter = ref("tv");
const year = ref(2023);
const season = ref("fall");
const seasons = ["spring", "summer", "fall", "winter"]; // Daftar musim opsional
const types = ["tv", "movie", "ova", "ona", "special", "music"]; // Daftar tipe opsional

const filterOpen = ref(false);

const togglefilter = () => {
  filterOpen.value = !filterOpen.value;
};

const url = computed(() => {
  return `/api/anime/seasons?year=${year.value}&season=${season.value}&filter=${filter.value}&page=${page.value}`;
});

//fetch data from API with "useAsyncData"
const { pending, data: ongoing }: any = await useFetch(url, {
  lazy: true,
});

const { data: getSeason }: any = await useLazyAsyncData("getSeason", () => $fetch(`${config.public.apiBase}/seasons`));
</script>

<template>
  <Head>
    <Title>{{ season.toUpperCase() }} {{ year }} | Anime Weebs</Title>
  </Head>
  <div class="py-32 bg-primary_white min-h-screen">
    <div class="container">
      <!-- Highlight -->
      <div class="flex justify-between mb-5 items-center">
        <h1 class="text-deep_blue font-semibold text-2xl capitalize">{{ ongoing.data[0].season }} {{ ongoing.data[0].year }} Anime</h1>
        <div class="relative">
          <button @click="togglefilter" class="text-deep_blue hover:opacity-80 flex ms-auto">Season &nbsp;<IconAdjustmentsHorizontal /></button>
          <Transition name="slide-fade">
            <div v-if="filterOpen" class="absolute z-10 top-10 right-0 shadow-lg bg-deep_blue rounded-md p-3 w-36 h-auto">
              <div class="mb-2">
                <label for="year" class="text-white">Year:</label>
                <select v-model="year" id="year" class="p-1 w-full rounded-md capitalize">
                  <option v-for="year in getSeason.data" :key="year">{{ year.year }}</option>
                </select>
              </div>
              <div class="mb-2">
                <label for="season" class="text-white">Season:</label>
                <select v-model="season" id="season" class="p-1 w-full rounded-md capitalize">
                  <option v-for="season in seasons" :key="season">{{ season }}</option>
                </select>
              </div>
              <div class="mb-2">
                <label for="filter" class="text-white">Type:</label>
                <select v-model="filter" id="filter" class="p-1 w-full rounded-md capitalize">
                  <option v-for="filter in types" :key="filter">{{ filter }}</option>
                </select>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 lg:grid-cols-5" v-if="pending">
        <AnimeCardPlaceholder v-for="index in 20" :key="index" />
      </div>
      <div v-else>
        <div class="grid grid-cols-2 lg:grid-cols-5 text-secondary gap-6">
          <NuxtLink v-for="anime in ongoing.data" :key="anime.mal_id" :to="`/anime/${anime.mal_id}`" class="rounded-lg shadow-lg bg-white relative group overflow-hidden">
            <div v-if="anime.score" class="absolute top-0 left-0 text-center bg-yellow-600 text-sm rounded-br-md text-white p-1 flex items-center gap-2">
              <IconStarFilled :size="12" />{{ anime.score }}
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

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
