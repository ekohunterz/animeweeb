<script setup lang="ts">
import { IconStarFilled } from "@tabler/icons-vue";

const props = defineProps({
  info: Object,
});
</script>

<template>
  <div class="flex flex-wrap lg:flex-no-wrap gap-5 bg-secondary p-3 mt-5 rounded-md shadow-md">
    <div class="w-full hidden lg:w-1/12 lg:flex flex-col gap-2 items-center">
      <label class="font-semibold">Score</label>
      <div class="text-yellow-600 font-bold flex items-center gap-2">
        <IconStarFilled /><span class="text-xl">{{ info?.score }}</span>
      </div>
    </div>
    <div class="border-l-2 h-auto border-dashed"></div>

    <div class="flex flex-wrap lg:flex-nowrap gap-8 grow">
      <div class="w-auto lg:hidden grow flex flex-col gap-2 items-center">
        <label class="font-semibold">Score</label>
        <div class="font-bold flex items-center gap-2 text-yellow-600">
          <IconStarFilled /><span class="text-xl">{{ info?.score }}</span>
        </div>
      </div>
      <div class="w-auto grow flex flex-col gap-2 items-center">
        <label class="">Type</label>
        <div class="font-bold flex items-center gap-2">
          <span class="text-xl">{{ info?.type }}</span>
        </div>
      </div>
      <div class="w-auto grow flex flex-col gap-2 items-center">
        <label class="">Episode</label>
        <div class="font-bold flex items-center gap-2">
          <span class="text-xl">{{ info?.episodes ?? "-" }}</span>
        </div>
      </div>
      <div class="w-auto grow flex flex-col gap-2 items-center">
        <label class="">Popularity</label>
        <div class="font-bold flex items-center gap-2">
          <span class="text-xl">#{{ info?.popularity }}</span>
        </div>
      </div>
      <div class="w-auto grow flex flex-col gap-2 items-center">
        <label class="">Rank</label>
        <div class="font-bold flex items-center gap-2">
          <span class="text-xl">#{{ info?.rank }}</span>
        </div>
      </div>
      <div class="w-auto grow flex flex-col gap-2 items-center">
        <label class="">Duration</label>
        <div class="font-bold flex items-center gap-2">
          <span class="text-xl">{{ info?.duration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
