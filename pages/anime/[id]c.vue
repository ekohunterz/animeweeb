<script lang="ts" setup>
import { IconStarFilled } from "@tabler/icons-vue";

definePageMeta({
  pageTransition: {
    name: "bounce",
    mode: "out-in", // default
  },
});
//init config
const config = useRuntimeConfig();

//init router
const router = useRouter();

//init route
const route = useRoute();

const id = computed(() => route.params.id);

function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

//fetch daa for get detail data post
const { data: anime }: any = await useFetch(`/api/anime/${id.value}`);
const { data: recommend }: any = await useFetch(`${config.public.apiBase}/recommendations/anime`);
const { data: news }: any = await useFetch(`${config.public.apiBase}/anime/${id.value}/news`);
</script>

<template>
  <div class="py-32 bg-primary_white min-h-screen">
    <div class="container">
      <div v-if="anime">
        <Head>
          <Title>{{ anime.data.title }} | Anime Weebs App</Title>
        </Head>
        <div class="flex flex-col lg:flex-row lg:justify-between gap-8">
          <div class="w-full lg:w-3/4">
            <p class="text-3xl dark:text-secondary mb-6">{{ anime.data.title }}</p>
            <iframe v-if="anime.data.trailer.embed_url" width="100%" class="h-96 lg:h-[500px] rounded-lg shadow-sm" :src="anime.data.trailer.embed_url"></iframe>
            <div class="flex flex-col lg:flex-row w-full gap-6 mt-8 dark:text-secondary">
              <div class="w-full lg:w-auto"><img class="rounded-lg mx-auto lg:mx-0" width="200" :src="anime.data.images['webp'].large_image_url" /></div>
              <div class="w-full lg:w-auto">
                <p class="leading-relaxed flex gap-3 items-center text-xl"><IconStarFilled color="yellow" />{{ anime.data.score }}</p>
                <label class="font-semibold text-lg">Type :</label>
                <p class="text-gray-400">{{ anime.data.type }}</p>
                <label class="font-semibold text-lg">Release :</label>
                <p class="text-gray-400">{{ anime.data.aired.from ? $dayjs(anime.data.aired.from).format("MMMM DD, YYYY") : "Unknown" }}</p>
                <label class="font-semibold text-lg">Duration :</label>
                <p class="text-gray-400">{{ anime.data.duration }}</p>
                <label class="font-semibold text-lg">Studios :</label>
                <p class="text-gray-400">
                  <span class="bg-gray-700 px-2 rounded-md mr-2" v-for="(studio, index) in anime.data.studios" :key="index"> {{ studio.name }}</span>
                </p>
                <label class="font-semibold text-lg">Genres :</label>
                <p class="text-gray-400">
                  <span class="bg-gray-700 px-2 rounded-md mr-2" v-for="(genre, index) in anime.data.genres" :key="index">{{ genre.name }}</span>
                </p>
              </div>
            </div>
            <div class="mt-8 dark:text-secondary">
              <h1 class="text-2xl mb-3 font-semibold">Synopsis</h1>
              <p class="leading-relaxed">{{ anime.data.synopsis }}</p>
            </div>

            <div class="mt-8 dark:text-secondary">
              <h1 class="text-2xl mb-3 font-semibold">Recommendations</h1>
              <div class="grid grid-cols-6 gap-3" v-if="recommend.data">
                <div class="grid gap-1text-secondary" v-for="anime in recommend.data.slice(0, 6)">
                  <NuxtLink :to="`/anime/${entry.mal_id}`" class="rounded-lg relative group mb-3" v-for="entry in anime.entry">
                    <img class="h-56 object-cover rounded-lg" :src="entry.images['webp'].image_url ? entry.images['webp'].image_url : 'https://placehold.co/600x400'" />

                    <div class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-80 text-white p-2 transition duration-300 opacity-0 group-hover:opacity-100">
                      {{ entry.title }}
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/4">
            <h1 class="dark:text-secondary font-semibold text-2xl mb-6">News</h1>
            <div class="grid grid-cols-1 gap-3" v-if="news.data">
              <NuxtLink v-for="anime in news.data" :to="`/anime/${anime.mal_id}`" class="w-full mx-auto max-h-36 bg-secondary shadow-md rounded-lg overflow-hidden flex">
                <img class="w-32 h-36 object-cover object-center" :src="anime.images['jpg'].image_url" alt="News Image" />
                <div class="flex-1 p-2 relative">
                  <h2 class="font-semibold text-gray-800 mb-2" :title="anime.title">{{ truncateText(anime.title, 50) }}</h2>
                  <div class="flex space-x-2 absolute bottom-2">
                    <span class="inline-block text-sm text-gray-700">{{ $dayjs(anime.date).format("MMMM DD, YYYY") }}</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Menggunakan pseudo-class group-hover untuk menampilkan judul saat card dihover */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
.group:hover .group-hover\:bottom-16 {
  bottom: 4rem; /* Sesuaikan tinggi dari bawah card sesuai keinginan Anda */
}
</style>
