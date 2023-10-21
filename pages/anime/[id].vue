<script lang="ts" setup>
import { IconStarFilled, IconExternalLink, IconLoaderQuarter } from "@tabler/icons-vue";

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

const isModalOpen = ref(false);
const typeModal = ref("");

const openModal = (type: string) => {
  isModalOpen.value = true;
  typeModal.value = type;
};

const closeModal = () => {
  isModalOpen.value = false;
};

//init route
const route = useRoute();

const id = computed(() => route.params.id);

const no = ref(1);
function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

//fetch daa for get detail data post
const { pending, data: anime }: any = await useFetch(`/api/anime/${id.value}`, {
  lazy: true,
});
</script>

<template>
  <div class="py-32 bg-primary_white min-h-screen">
    <div class="container">
      <div class="bg-gray-100 p-3 h-screen w-full flex items-center justify-center text-4xl font-bold" v-if="pending">
        <IconLoaderQuarter class="animate-spin" :size="64" />
        <p>Loading...</p>
      </div>
      <div v-else>
        <Head>
          <Title>{{ anime.data.title }} | Anime Weebs App</Title>
        </Head>
        <div class="lg:flex w-full gap-8 lg:justify-between">
          <div class="w-full lg:w-1/4">
            <h1 class="lg:hidden text-4xl font-bold text-deep_blue">{{ anime.data.title }}</h1>
            <p class="lg:hidden leading-relaxed mt-3 mb-3 text-deep_blue">{{ anime.data.title_japanese }}</p>
            <img class="w-full" :src="anime.data.images['webp'].large_image_url" />
            <div class="flex gap-3 w-full mt-6">
              <button @click="openModal('trailer')" class="w-1/2 bg-deep_blue py-2 hover:bg-opacity-80 duration-300 ease-in-out rounded-md text-secondary">Watch Trailer</button>
              <button @click="openModal('streaming')" class="w-1/2 bg-cerise_red py-2 hover:bg-opacity-80 duration-300 ease-in-out rounded-md text-secondary">Streaming</button>
            </div>
            <div class="mt-6 mb-3 border-[1px] border-dashed"></div>
            <div class="flex flex-col gap-3">
              <div>
                <label class="font-bold">Status:</label>
                <p class="font-light text-sm">{{ anime.data.status }}</p>
              </div>
              <div>
                <label class="font-bold">Aired:</label>
                <p class="font-light text-sm">
                  {{ $dayjs(anime.data.aired.from).format("MMMM DD, YYYY") }} {{ anime.data.aired.to ? "to " + $dayjs(anime.data.aired.to).format("MMMM DD, YYYY") : "" }}
                </p>
              </div>
              <div>
                <label class="font-bold">Studios:</label>
                <p class="font-light text-sm">
                  <span v-for="(studio, index) in anime.data.studios"> {{ studio.name }}<span v-if="index < anime.data.studios.length - 1">, </span> </span>
                </p>
              </div>
              <div>
                <label class="font-bold">Source:</label>
                <p class="font-light text-sm">{{ anime.data.source }}</p>
              </div>
              <div>
                <label class="font-bold">Season:</label>
                <p class="font-light text-sm capitalize">{{ anime.data.season }} {{ anime.data.year }}</p>
              </div>
              <div>
                <label class="font-bold">Rating:</label>
                <p class="font-light text-sm capitalize">{{ anime.data.rating }}</p>
              </div>
              <div>
                <label class="font-bold">Themes:</label>
                <p class="font-light text-sm">
                  <span v-for="(theme, index) in anime.data.themes"> {{ theme.name }}<span v-if="index < anime.data.themes.length - 1">, </span> </span>
                </p>
              </div>
              <div>
                <label class="font-bold">Demographics:</label>
                <p class="font-light text-sm">
                  <span v-for="(demographic, index) in anime.data.demographics"> {{ demographic.name }}<span v-if="index < anime.data.demographics.length - 1">, </span> </span>
                </p>
              </div>
              <div class="mt-6">
                <a :href="anime.data.url" class="w-48 hidden lg:flex items-center justify-center gap-3 bg-deep_blue px-4 py-2 hover:bg-opacity-80 duration-300 ease-in-out rounded-md text-secondary"
                  ><span>MyAnimelist</span> <IconExternalLink />
                </a>
              </div>
            </div>
          </div>
          <div class="w-full mt-8 lg:mt-0 lg:w-3/4">
            <h1 class="hidden lg:flex text-4xl font-bold text-deep_blue">{{ anime.data.title }}</h1>
            <p class="hidden lg:flex leading-relaxed mt-3 text-deep_blue">{{ anime.data.title_japanese }}</p>

            <div class="flex flex-wrap gap-3">
              <div class="bg-secondary py-1 px-3 font-semibold rounded-md shadow-md mt-6 text-primary_dark" v-for="genre in anime.data.genres">{{ genre.name }}</div>
            </div>
            <div class="flex flex-wrap lg:flex-no-wrap gap-5 bg-secondary p-3 mt-5 rounded-md shadow-md">
              <div class="w-full hidden lg:w-1/12 lg:flex flex-col gap-2 items-center">
                <label class="font-semibold">Score</label>
                <div class="text-yellow-600 font-bold flex items-center gap-2">
                  <IconStarFilled /><span class="text-xl">{{ anime.data.score }}</span>
                </div>
              </div>
              <div class="border-l-2 h-auto border-dashed"></div>

              <div class="flex flex-wrap lg:flex-nowrap gap-8 grow">
                <div class="w-auto lg:hidden grow flex flex-col gap-2 items-center">
                  <label class="font-semibold">Score</label>
                  <div class="font-bold flex items-center gap-2 text-yellow-600">
                    <IconStarFilled /><span class="text-xl">{{ anime.data.score }}</span>
                  </div>
                </div>
                <div class="w-auto grow flex flex-col gap-2 items-center">
                  <label class="">Type</label>
                  <div class="font-bold flex items-center gap-2">
                    <span class="text-xl">{{ anime.data.type }}</span>
                  </div>
                </div>
                <div class="w-auto grow flex flex-col gap-2 items-center">
                  <label class="">Episode</label>
                  <div class="font-bold flex items-center gap-2">
                    <span class="text-xl">{{ anime.data.episodes ?? "-" }}</span>
                  </div>
                </div>
                <div class="w-auto grow flex flex-col gap-2 items-center">
                  <label class="">Popularity</label>
                  <div class="font-bold flex items-center gap-2">
                    <span class="text-xl">#{{ anime.data.popularity }}</span>
                  </div>
                </div>
                <div class="w-auto grow flex flex-col gap-2 items-center">
                  <label class="">Rank</label>
                  <div class="font-bold flex items-center gap-2">
                    <span class="text-xl">#{{ anime.data.rank }}</span>
                  </div>
                </div>
                <div class="w-auto grow flex flex-col gap-2 items-center">
                  <label class="">Duration</label>
                  <div class="font-bold flex items-center gap-2">
                    <span class="text-xl">{{ anime.data.duration }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="leading-relaxed text-2xl mt-6 text-primary_dark">Synopsis</div>
            <div class="mt-3 border-[1px] border-dashed"></div>
            <div class="leading-relaxed mt-6 text-primary_dark">{{ anime.data.synopsis }}</div>

            <div class="leading-relaxed text-2xl mt-6 text-primary_dark">Related Anime</div>
            <div class="mt-3 mb-3 border-[1px] border-dashed"></div>
            <div class="lg:flex lg:flex-wrap lg:justify-between mb-1" v-for="related in anime.data.relations">
              <div class="lg:w-1/6 font-bold text-primary_dark mr-3">{{ related.relation }}</div>
              <div class="hidden lg:flex font-bold text-primary_dark">:</div>
              <div class="lg:w-3/4 flex flex-col">
                <div v-for="entry in related.entry">
                  <NuxtLink v-if="entry.type === 'anime'" :to="`/anime/${entry.mal_id}`" class="font-light hover:text-deep_blue">{{ entry.name }} ({{ entry.type }}) </NuxtLink>
                  <NuxtLink v-if="entry.type === 'manga'" :to="`/manga/${entry.mal_id}`" class="font-light hover:text-deep_blue">{{ entry.name }} ({{ entry.type }}) </NuxtLink>
                </div>
              </div>
            </div>

            <div class="leading-relaxed text-2xl mt-6 text-primary_dark">Theme</div>
            <div class="mt-2 border-[1px] border-dashed"></div>
            <div class="grid lg:grid-cols-2 mt-2 gap-3 text-sm">
              <div>
                <h1 class="font-bold">Openings</h1>
                <ul class="mt-2">
                  <li class="mb-1" v-for="op in anime.data.theme.openings">{{ op }}</li>
                </ul>
              </div>
              <div>
                <h1 class="font-bold">Endings</h1>
                <ul class="mt-2">
                  <li class="mb-1" v-for="op in anime.data.theme.endings">{{ op }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalView :isOpen="isModalOpen" @close="closeModal" :data="anime?.data" :type="typeModal" />
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
