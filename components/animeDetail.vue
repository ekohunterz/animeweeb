<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";
const props = defineProps({
  detail: Object,
});

const isModalOpen = ref(false);
const typeModal = ref("");

const openModal = (type: string) => {
  isModalOpen.value = true;
  typeModal.value = type;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="w-full lg:w-1/4">
    <h1 class="lg:hidden text-4xl font-bold text-deep_blue">{{ detail?.title }}</h1>
    <p class="lg:hidden leading-relaxed mt-3 mb-3 text-deep_blue">{{ detail?.title_japanese }}</p>
    <NuxtImg class="w-full" :src="detail?.images['webp'].large_image_url" />
    <div class="flex gap-3 w-full mt-6">
      <button @click="openModal('trailer')" class="w-1/2 bg-deep_blue py-2 hover:bg-opacity-80 duration-300 ease-in-out rounded-md text-secondary">Watch Trailer</button>
      <button @click="openModal('streaming')" class="w-1/2 bg-cerise_red py-2 hover:bg-opacity-80 duration-300 ease-in-out rounded-md text-secondary">Streaming</button>
    </div>
    <div class="mt-6 mb-3 border-[1px] border-dashed"></div>
    <div class="flex flex-col gap-3">
      <div>
        <label class="font-bold">Status:</label>
        <p class="font-light text-sm">{{ detail?.status }}</p>
      </div>
      <div>
        <label class="font-bold">Aired:</label>
        <p class="font-light text-sm">{{ $dayjs(detail?.aired.from).format("MMMM DD, YYYY") }} {{ detail?.aired.to ? "to " + $dayjs(detail?.aired.to).format("MMMM DD, YYYY") : "" }}</p>
      </div>
      <div>
        <label class="font-bold">Studios:</label>
        <p class="font-light text-sm">
          <span v-for="(studio, index) in detail?.studios"> {{ studio.name }}<span v-if="index < detail?.studios.length - 1">, </span> </span>
        </p>
      </div>
      <div>
        <label class="font-bold">Source:</label>
        <p class="font-light text-sm">{{ detail?.source }}</p>
      </div>
      <div>
        <label class="font-bold">Season:</label>
        <p class="font-light text-sm capitalize">{{ detail?.season }} {{ detail?.year }}</p>
      </div>
      <div>
        <label class="font-bold">Rating:</label>
        <p class="font-light text-sm capitalize">{{ detail?.rating }}</p>
      </div>
      <div>
        <label class="font-bold">Themes:</label>
        <p class="font-light text-sm">
          <span v-for="(theme, index) in detail?.themes"> {{ theme.name }}<span v-if="index < detail?.themes.length - 1">, </span> </span>
        </p>
      </div>
      <div>
        <label class="font-bold">Demographics:</label>
        <p class="font-light text-sm">
          <span v-for="(demographic, index) in detail?.demographics"> {{ demographic.name }}<span v-if="index < detail?.demographics.length - 1">, </span> </span>
        </p>
      </div>
      <div class="mt-6">
        <a :href="detail?.url" class="w-48 hidden lg:flex items-center justify-center gap-3 bg-deep_blue px-4 py-2 hover:bg-opacity-80 duration-300 ease-in-out rounded-md text-secondary"
          ><span>MyAnimelist</span> <IconExternalLink />
        </a>
      </div>
    </div>
    <ModalView :isOpen="isModalOpen" @close="closeModal" :data="detail" :type="typeModal" />
  </div>
</template>
