<script setup lang="ts">
const props = defineProps({
  relations: Object,
});
</script>

<template>
  <div class="leading-relaxed text-2xl mt-6 text-primary_dark">Related Anime</div>
  <div class="mt-3 mb-3 border-[1px] border-dashed"></div>
  <div class="lg:flex lg:flex-wrap lg:justify-between mb-1" v-for="related in relations">
    <div class="lg:w-1/6 font-bold text-primary_dark mr-3">{{ related.relation }}</div>
    <div class="hidden lg:flex font-bold text-primary_dark">:</div>
    <div class="lg:w-3/4 flex flex-col">
      <div v-for="entry in related.entry">
        <NuxtLink v-if="entry.type === 'anime'" :to="`/anime/${entry.mal_id}`" class="font-light hover:text-deep_blue">{{ entry.name }} ({{ entry.type }}) </NuxtLink>
        <NuxtLink v-if="entry.type === 'manga'" :to="`/manga/${entry.mal_id}`" class="font-light hover:text-deep_blue">{{ entry.name }} ({{ entry.type }}) </NuxtLink>
      </div>
    </div>
  </div>
</template>
