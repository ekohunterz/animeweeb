<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.9s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
