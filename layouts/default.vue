<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { IconSunHigh, IconMoon } from "@tabler/icons-vue";

const isDark = useDark();
const isScrolled = ref("");
const isMenuOpen = ref(false);
const toggleDark = useToggle(isDark);

const search = ref("");
const searchDebounce = refDebounced(search, 700);

const url = computed(() => {
  return `/api/anime/search?query=${searchDebounce.value}`;
});

const { data: searchResult }: any = await useFetch(url);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div>
    <div class="pt-4 pb-3 z-10 bg-primary_dark">
      <div class="container flex justify-between items-center">
        <div class="flex gap-4 items-center">
          <NuxtLink to="/" class="text-white font-aubrey font-bold text-xl mr-4"> Anime Weebs </NuxtLink>
          <div class="md:flex space-x-4 hidden">
            <NuxtLink to="/" class="text-white font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all" exact-active-class="text-gray-300"> Home </NuxtLink>
            <NuxtLink to="/news" class="text-white font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all" exact-active-class="text-gray-300"> News </NuxtLink>
            <NuxtLink to="/categories" class="text-white font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all"> Categories </NuxtLink>
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
          <input v-model="search" class="p-2 rounded-md ring-2 ring-white outline-none bg-primary_dark text-secondary" type="text" placeholder="Search..." />
          <div v-if="search && searchResult" class="text-black flex w-96 flex-col absolute right-0 top-12 rounded-md z-50 h-96 overflow-auto bg-white p-4">
            <NuxtLink class="hover:bg-gray-300 p-2" :to="`/anime/${anime.mal_id}`" v-for="anime in searchResult.data" :key="anime.mal_id">
              {{ anime.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu (hidden by default) -->
    <div v-if="isMenuOpen" class="fixed top-0 right-0 left-0 z-[9] md:hidden pt-24 bg-primary_dark container pb-3">
      <NuxtLink to="/" class="text-secondary block py-2 font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all" exact-active-class="text-gray-300"> Home </NuxtLink>
      <NuxtLink to="/news/" class="text-secondary block py-2 font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all" exact-active-class="text-gray-300"> News </NuxtLink>
      <NuxtLink to="/categories/" class="text-secondary block py-2 font-semibold text-base hover:text-gray-300 ease-in-out duration-300 transition-all"> Categories </NuxtLink>
      <div class="relative">
        <input v-model="search" class="p-2 w-full rounded-md my-2" type="text" placeholder="Search..." />
        <div v-if="search && searchResult" class="text-black flex w-3/4 flex-col absolute right-0 top-12 rounded-md h-96 overflow-auto bg-white p-4">
          <NuxtLink class="hover:bg-gray-300 p-2" :to="`/anime/${anime.mal_id}`" v-for="anime in searchResult.data" :key="anime.mal_id">
            {{ anime.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
