<script lang="ts" setup>
import { IconStarFilled } from "@tabler/icons-vue";
const props = defineProps({
  animeList: Object,
});
</script>

<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperNavigation]"
    :slides-per-view="2"
    :loop="true"
    :breakpoints="{
      '1024': {
        slidesPerView: 6,
        spaceBetween: 20,
      },
    }"
    :navigation="true"
    :space-between="20"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide v-for="(anime, index) in animeList" :key="index" class="h-96">
      <NuxtLink :to="`/anime/${anime.mal_id}`" class="rounded-lg bg-white relative group overflow-hidden">
        <div v-if="anime.score" class="absolute top-0 left-0 text-center bg-yellow-600 text-sm text-white p-1 flex items-center gap-2"><IconStarFilled size="12" />{{ anime.score }}</div>
        <img class="object-cover w-full h-80 rounded-lg" :src="anime.images['webp'].large_image_url" alt="Anime Image" />
        <div class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-80 text-white p-2 transition duration-300 opacity-0 group-hover:opacity-100">
          {{ anime.titles[0].title }}
        </div>
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
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
