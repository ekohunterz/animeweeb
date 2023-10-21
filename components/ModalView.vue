<script setup>
import { IconX } from "@tabler/icons-vue";

const emit = defineEmits(["close"]);

const props = defineProps({
  isOpen: Boolean,
  type: String,
  data: Object,
});
</script>

<template>
  <!-- Modal -->
  <div>
    <Transition>
      <div v-if="props.isOpen" class="fixed inset-0 flex items-center backdrop-blur-sm justify-center z-50">
        <!-- Latar belakang gelap saat modal terbuka -->
        <div @click="emit('close')" class="modal-overlay fixed inset-0 bg-gray-100 dark:bg-teal-950 opacity-80"></div>

        <!-- Konten Modal -->
        <div class="modal-container bg-white dark:bg-primary_dark lg:w-1/2 lg:h-auto custom-scrollbar overflow-auto max-h-[60%] w-2/3 mx-auto p-6 rounded shadow-lg z-50">
          <div class="p-6">
            <div class="mb-6 flex items-center justify-between">
              <h4 class="text-xl font-semibold dark:text-white">Watch</h4>
              <button @click="emit('close')"><IconX /></button>
            </div>
            <div v-if="type == 'trailer'">
              <iframe v-if="data.trailer.embed_url" class="w-full h-72" :src="data.trailer.embed_url"></iframe>
              <p v-else>No video</p>
            </div>
            <div v-if="type == 'streaming'">
              <p class="whitespace-pre-wrap text-sm !leading-8 text-black dark:text-secondary md:text-base">Streaming available at:</p>
              <div class="mt-4 flex flex-wrap text-secondary gap-3">
                <a class="bg-deep_blue p-3 rounded-md hover:bg-opacity-75 ease-in-out duration-300" :href="stream.url" target="_blank" v-for="stream in data.streaming">{{ stream.name }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Gaya untuk overlay modal */
.modal-overlay {
  z-index: 49;
}

/* Gaya untuk modal */
.modal-container {
  z-index: 50;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
