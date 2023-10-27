<script lang="ts" setup>
import { IconBadgeFilled } from "@tabler/icons-vue";
import { IconStarFilled } from "@tabler/icons-vue";

const route = useRoute();
//init config
const config = useRuntimeConfig();

const page = ref(1);

const isMobile = computed(() => {
  return window.innerWidth <= 768;
});

const url = computed(() => {
  return `${config.public.apiBase}/top/anime?page=${page.value}`;
});

function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

//fetch data from API with "useAsyncData"
const { pending, data: animes }: any = await useLazyFetch(url);
</script>

<template>
  <div>
    <Head>
      <Title>TOP Anime | Anime Weebs App</Title>
      <Meta name="description" content="Top Anime" />
    </Head>
    <div class="py-32 bg-primary_white">
      <div class="container">
        <!-- Highlight -->

        <div class="flex justify-between">
          <h1 class="text-deep_blue font-semibold text-xl mb-3">TOP Anime</h1>
        </div>
        <div class="grid gap-5 grid-cols-1" v-if="pending">
          <AnimeCardPlaceholder v-for="index in 18" :key="index" />
        </div>
        <div class="grid grid-cols-2 lg:flex lg:flex-col gap-4" v-else>
          <NuxtLink
            :to="`/anime/${anime.mal_id}`"
            v-for="anime  in animes.data.sort((a: any, b: any) => a.rank - b.rank)"
            :key="anime"
            class="bg-secondary lg:flex gap-4 shadow-md rounded-md p-3 hover:scale-105 hover:text-deep_blue duration-300 ease-linear"
          >
            <div class="flex items-center h-52 lg:h-auto justify-center w-auto gap-8">
              <h1 class="hidden lg:flex text-xl font-bold">#{{ anime.rank }}</h1>
              <NuxtImg class="lg:h-24 lg:w-16 rounded-lg" :src="anime.images['webp'].image_url" />
            </div>
            <div class="w-auto hidden lg:flex lg:flex-col mt-2 lg:mt-0">
              <h1 class="text-lg font-bold">{{ anime.title }}</h1>
              <div class="border-b-2 lg:hidden my-2 h-full border-dashed"></div>
              <p class="text-sm font-extralight leading-relaxed">{{ anime.type }} ({{ anime.episodes }} eps)</p>
              <p class="text-sm font-extralight leading-relaxed">{{ $dayjs(anime.aired.from).format("MMM YYYY") }} {{ anime.aired.to ? "- " + $dayjs(anime.aired.to).format("MMM YYYY") : "" }}</p>
              <p class="text-sm hidden lg:flex font-extralight leading-relaxed">{{ anime.rating }}</p>
            </div>

            <!-- Mobile -->
            <div class="lg:hidden flex flex-col">
              <div class="lg:hidden h-[7rem] mt-2 overflow-hidden">
                <h1 class="font-bold">{{ truncateText(anime.title, 20) }}</h1>
                <div class="flex flex-col mt-2 h-full">
                  <p class="text-sm font-extralight leading-relaxed">{{ anime.type }} ({{ anime.episodes }} eps)</p>
                  <p class="text-sm font-extralight leading-relaxed">{{ $dayjs(anime.aired.from).format("MMM YYYY") }}</p>
                </div>
              </div>
              <div class="lg:hidden mb-2 border-b-2 h-2 border-dashed"></div>
              <div class="lg:hidden flex mt-auto h-full justify-between">
                <h1 class="flex items-center font-bold gap-1"><IconStarFilled :size="20" color="orange" />{{ anime.score }}</h1>
                <h1 class="font-bold">#{{ anime.rank }}</h1>
              </div>
            </div>

            <div class="lg:ms-auto hidden w-[7%] lg:h-24 font-bold lg:flex items-center my-auto gap-2">
              <div class="border-r-2 h-full border-dashed"></div>
              <IconStarFilled color="orange" />
              <h1 class="text-xl">{{ anime.score }}</h1>
            </div>
          </NuxtLink>
        </div>
        <div v-if="animes?.pagination" class="flex justify-center items-center text-black my-8 space-x-4">
          <button @click="page--" :disabled="page === 1" class="bg-deep_blue w-24 hover:bg-primary_light text-white font-semibold py-1 rounded transition duration-300 ease-in-out">Previous</button>
          <div class="flex items-center">
            <span class="mr-2">&nbsp;{{ page }}&nbsp; / &nbsp;{{ animes.pagination.last_visible_page }}</span>
          </div>
          <button
            @click="page++"
            :disabled="page === animes.pagination.last_visible_page"
            class="bg-deep_blue hover:bg-primary_light w-24 text-white font-semibold py-1 rounded transition duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
