
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import type { Guest } from './PasskeyView.vue'

const props = defineProps<{
  guest: Guest
}>()

const isZooming = ref(false)
const showCanvas = ref(false)

let zoomTimer: number | null = null

function openCanvas() {
  if (isZooming.value || showCanvas.value) return

  isZooming.value = true

  zoomTimer = window.setTimeout(() => {
    showCanvas.value = true
  }, 1200)
}

function closeInvitation() {
  isZooming.value = false
  showCanvas.value = false
}

onBeforeUnmount(() => {
  if (zoomTimer !== null) {
    clearTimeout(zoomTimer)
  }
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-[#f7eee7]">
    <!-- Canvas -->
    <Transition
      enter-active-class="transition duration-1000 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <iframe
        v-if="showCanvas"
        :src="props.guest.canvasUrl"
        title="Wedding Invitation"
        allow="fullscreen"
        class="absolute inset-0 z-20 h-screen w-full border-0 bg-[#111]"
      />
    </Transition>

    <!-- Preview -->
    <Transition
      enter-active-class="transition duration-700 ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-1000 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-[2.5] opacity-0"
    >
      <section
        v-if="!showCanvas"
        class="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-10"
        :class="{ 'preview-zooming': isZooming }"
      >
        <p
          class="mb-7 text-[10px] font-medium tracking-[0.4em] text-[#b99a91]"
        >
          THE WEDDING
        </p>

        <!-- Custom thumbnail -->
        <button
          type="button"
          class="thumbnail group relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border-8 border-[#fffaf3] bg-[#d9e8e5] text-left shadow-2xl shadow-[#8e7565]/20"
          :disabled="isZooming"
          @click="openCanvas"
        >
          <!-- Pastel illustration -->
          <div class="absolute inset-0 bg-gradient-to-b from-[#dcebe8] via-[#f7ddd6] to-[#d8e3d7]" />

          <div class="absolute left-5 top-6 text-3xl opacity-80">🌸</div>
          <div class="absolute right-5 top-10 text-3xl opacity-80">🌷</div>

          <div class="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <p class="text-[9px] font-medium tracking-[0.4em] text-[#85746e]">
              THE WEDDING
            </p>

            <h1 class="mt-5 font-serif text-4xl italic leading-tight text-[#72564f]">
              Fachry
              <br />
              <span class="text-2xl not-italic">&amp;</span>
              <br />
              Pappoy
            </h1>

            <div class="my-5 text-xl text-[#c78e88]">♡</div>

            <div class="rounded-full bg-white/50 px-4 py-2 text-[10px] tracking-wide text-[#89716b]">
              Our beautiful beginning
            </div>
          </div>

          <div class="absolute bottom-4 left-0 right-0 text-center text-2xl">
            🌿 🌸 🌿
          </div>

          <!-- Overlay -->
          <div
            class="absolute inset-0 flex items-center justify-center bg-[#76594f]/0 transition duration-300 group-hover:bg-[#76594f]/10"
          >
            <span
              class="rounded-full bg-white/85 px-5 py-3 text-xs text-[#76594f] opacity-0 shadow-md transition duration-300 group-hover:opacity-100"
            >
              Klik untuk memperbesar
            </span>
          </div>
        </button>

        <p class="mt-7 text-center font-serif text-sm italic text-[#a58a7e]">
          Sebuah cerita untuk dikenang selamanya ♡
        </p>

        <button
          type="button"
          class="mt-6 rounded-full bg-[#d99b99] px-8 py-4 text-sm font-medium text-white shadow-lg shadow-[#d99b99]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#cd8987] active:translate-y-0 disabled:opacity-50"
          :disabled="isZooming"
          @click="openCanvas"
        >
          {{ isZooming ? 'Membuka undangan...' : 'Buka Undangan →' }}
        </button>
      </section>
    </Transition>

    <!-- Close button -->
    <button
      v-if="showCanvas"
      type="button"
      aria-label="Close invitation"
      class="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-xl font-light text-white/80 backdrop-blur-sm transition hover:bg-black/50 hover:text-white"
      @click="closeInvitation"
    >
      ×
    </button>
  </main>
</template>

<style scoped>
.thumbnail {
  transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1);
}

.preview-zooming .thumbnail {
  transform: scale(2.8);
}
</style>
