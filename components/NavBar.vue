<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { IconSunHigh, IconMoon } from "@tabler/icons-vue";
import { IconX } from "@tabler/icons-vue";

const isDark = useDark();
const isScrolled = ref("");
const isMenuOpen = ref(false);
const toggleDark = useToggle(isDark);

const search = ref("");
const searchDebounce = refDebounced(search, 700);

const router = useRouter();

const closeMenu = () => {
  isMenuOpen.value = false;
};

const clearSearch = () => {
  search.value = "";
};

const url = computed(() => {
  return `/api/anime/search?query=${searchDebounce.value}`;
});

const { data: searchResult }: any = await useFetch(url);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

watch(router.currentRoute, () => {
  closeMenu();
  clearSearch();
});
</script>

<template>
  <div>
    <div class="pt-4 absolute left-0 right-0 top-0 pb-3 z-[9999] bg-deep_blue">
      <div class="container flex justify-between items-center">
        <div class="flex gap-4 items-center">
          <NuxtLink to="/" class="text-white font-aubrey font-bold text-2xl mr-4"> Anime Weebs </NuxtLink>
          <div class="md:flex space-x-4 hidden">
            <NuxtLink to="/" class="text-white font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all" exact-active-class="text-gray-300"> Home </NuxtLink>
            <NuxtLink to="/season" class="text-white font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all" exact-active-class="text-gray-300"> Seasons </NuxtLink>
            <NuxtLink to="/top" class="text-white font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all"> Top Anime </NuxtLink>
          </div>
        </div>

        <div class="lg:hidden">
          <button @click="toggleMenu" class="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28px" height="28px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </button>
        </div>
        <div class="md:flex space-x-4 hidden relative">
          <input v-model="search" class="p-2 rounded-md placeholder:text-secondary ring-2 ring-white outline-none bg-deep_blue text-secondary" type="text" placeholder="Search..." />
          <button v-if="search" @click="clearSearch" class="absolute top-2 right-4 text-secondary">
            <IconX />
          </button>
          <div v-if="search && searchResult" class="text-black flex w-96 flex-col absolute right-0 top-12 rounded-md z-50 h-96 overflow-auto shadow-lg bg-white p-4">
            <NuxtLink class="hover:bg-gray-300 p-2" :to="`/anime/${anime.mal_id}`" v-for="anime in searchResult.data" :key="anime.mal_id">
              {{ anime.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu (hidden by default) -->
    <div v-if="isMenuOpen" class="absolute top-0 right-0 left-0 z-[9998] md:hidden pt-24 bg-deep_blue container pb-3">
      <NuxtLink to="/" class="text-secondary block py-2 font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all" exact-active-class="text-gray-300"> Home </NuxtLink>
      <NuxtLink to="/season/" class="text-secondary block py-2 font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all" exact-active-class="text-gray-300">
        Seasons
      </NuxtLink>
      <NuxtLink to="/top/" class="text-secondary block py-2 font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all"> Top Anime </NuxtLink>
      <div class="relative">
        <input v-model="search" class="p-2 w-full rounded-md my-2 text-black" type="text" placeholder="Search..." />
        <button v-if="search" @click="clearSearch" class="absolute top-4 right-4 text-black">
          <IconX />
        </button>
        <div v-if="search && searchResult" class="text-black flex w-3/4 flex-col absolute right-0 top-12 rounded-md h-96 overflow-auto shadow-lg bg-white p-4">
          <NuxtLink class="hover:bg-gray-300 p-2" :to="`/anime/${anime.mal_id}`" v-for="anime in searchResult.data" :key="anime.mal_id">
            {{ anime.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
