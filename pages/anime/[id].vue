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

//fetch daa for get detail data post
const { data: anime }: any = await useFetch(`/api/anime/${id.value}`);
const { data: recommend }: any = await useFetch(`${config.public.apiBase}/recommendations/anime`);
</script>

<template>
  <div class="py-16 bg-primary_dark min-h-screen">
    <div class="container">
      <div v-if="anime">
        <Head>
          <Title>{{ anime.data.title }} | Anime Weebs App</Title>
        </Head>
        <div class="flex flex-col lg:flex-row lg:justify-between gap-8">
          <div class="w-full lg:w-3/4">
            <p class="text-3xl text-secondary mb-6">{{ anime.data.title }}</p>
            <iframe v-if="anime.data.trailer.embed_url" width="100%" height="500" class="rounded-lg shadow-sm" :src="anime.data.trailer.embed_url"></iframe>
            <div class="flex flex-col lg:flex-row w-full gap-6 mt-8 text-secondary">
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
            <div class="mt-8 text-secondary">
              <h1 class="text-2xl mb-3 font-semibold">Synopsis</h1>
              <p class="leading-relaxed">{{ anime.data.synopsis }}</p>
            </div>
          </div>
          <div class="w-full lg:w-1/4">
            <h1 class="text-secondary text-2xl mb-6">Recommendations</h1>
            <div v-if="recommend.data">
              <div class="text-secondary grid grid-cols-2 gap-3" v-for="anime in recommend.data.slice(0, 4)">
                <NuxtLink :to="`/anime/${entry.mal_id}`" class="rounded-lg relative group mb-3" v-for="entry in anime.entry">
                  <img class="h-56 object-cover rounded-lg" :src="entry.images['webp'].image_url" />

                  <div class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-80 text-white p-2 transition duration-300 opacity-0 group-hover:opacity-100">
                    {{ entry.title }}
                  </div>
                </NuxtLink>
              </div>
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
