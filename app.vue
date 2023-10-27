<template>
  <NavBar />
  <NuxtPage />
  <VitePwaManifest />
  <PopupPWA />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
