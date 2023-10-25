<script setup lang="ts">
const props = defineProps({
  theme: Object,
});
</script>

<template>
  <div class="leading-relaxed text-2xl mt-6 text-primary_dark">Theme</div>
  <div class="mt-2 border-[1px] border-dashed"></div>
  <div class="grid lg:grid-cols-2 mt-2 gap-3 text-sm">
    <div>
      <h1 class="font-bold">Openings</h1>
      <ul class="mt-2">
        <li class="mb-1" v-for="op in theme?.openings">{{ op }}</li>
      </ul>
    </div>
    <div>
      <h1 class="font-bold">Endings</h1>
      <ul class="mt-2">
        <li class="mb-1" v-for="op in theme?.endings">{{ op }}</li>
      </ul>
    </div>
  </div>
</template>
