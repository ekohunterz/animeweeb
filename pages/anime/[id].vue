<script lang="ts" setup>
import { IconLoaderQuarter } from "@tabler/icons-vue";

//init config
const config = useRuntimeConfig();

//init router
const router = useRouter();

//init route
const route = useRoute();

const id = computed(() => route.params.id);

const no = ref(1);

//fetch daa for get detail data post
const { pending, data: anime }: any = await useLazyFetch(`/api/anime/${id.value}`);
</script>

<template>
  <div>
    <div class="py-32 bg-primary_white min-h-screen">
      <div class="container">
        <div class="bg-primary_white p-3 h-screen w-full flex items-center justify-center text-4xl font-bold" v-if="pending">
          <IconLoaderQuarter class="animate-spin" :size="64" />
          <p>Loading...</p>
        </div>
        <div v-else>
          <Head>
            <Title>{{ anime.data.title }} | Anime Weebs App</Title>
            <Meta name="description" :content="anime.data.synopsis" />
          </Head>
          <div class="lg:flex w-full gap-8 lg:justify-between">
            <AnimeDetail :detail="anime.data" />

            <div class="w-full mt-8 lg:mt-0 lg:w-3/4">
              <h1 class="hidden lg:flex text-4xl font-bold text-deep_blue">{{ anime.data.title }}</h1>
              <p class="hidden lg:flex leading-relaxed mt-3 text-deep_blue">{{ anime.data.title_japanese }}</p>

              <div class="flex flex-wrap gap-3">
                <div class="bg-secondary py-1 px-3 font-semibold rounded-md shadow-md mt-6 text-primary_dark" v-for="genre in anime.data.genres">{{ genre.name }}</div>
              </div>

              <AnimeInfo :info="anime.data" />

              <div class="leading-relaxed text-2xl mt-6 text-primary_dark">Synopsis</div>
              <div class="mt-3 border-[1px] border-dashed"></div>
              <div class="leading-relaxed mt-6 text-primary_dark">{{ anime.data.synopsis }}</div>

              <RelatedAnime :relations="anime.data?.relations" />

              <AnimeTheme :theme="anime.data?.theme" />
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
