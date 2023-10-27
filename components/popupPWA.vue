<script setup></script>

<template>
  <ClientOnly>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="fixed bottom-2.5 right-2.5 z-[100] max-w-[80%] rounded-lg border border-gray-300/70 bg-white p-4 shadow dark:border-gray-700 dark:bg-background-dark-soft md:bottom-5 md:right-5"
      role="alert"
    >
      <div class="mb-2 text-sm text-deep_blue dark:text-slate-200 md:text-base">
        <span v-if="$pwa.offlineReady">App ready to work offline</span>
        <span v-else> New content available, click on reload button to update. </span>
      </div>

      <button v-if="$pwa.needRefresh" class="mr-2 bg-gray-200 p-2 rounded-md" @click="$pwa.updateServiceWorker()">Update</button>

      <button class="bg-gray-200 p-2 rounded-md" @click="$pwa.cancelPrompt()">Close</button>
    </div>

    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
      class="fixed bottom-2.5 right-2.5 z-[100] rounded-lg border border-gray-300/70 bg-white p-4 shadow dark:border-gray-700 dark:bg-background-dark-soft md:bottom-5 md:right-5"
      role="alert"
    >
      <p class="mb-2 text-sm text-deep_blue dark:text-slate-200 md:text-base">Install Application to Home screen</p>

      <button v-if="$pwa.needRefresh" class="mr-2 bg-gray-200 p-2 rounded-md" @click="$pwa.install()">Install</button>

      <button class="bg-gray-200 p-2 rounded-md" @click="$pwa.cancelInstall()">Close</button>
    </div>
  </ClientOnly>
</template>
