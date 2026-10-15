<script setup lang="ts">
import type { Guest } from './PasskeyView.vue'

defineProps<{ guest: Guest }>()

const emit = defineEmits<{
  finished: []
}>()
</script>

<template>
  <main
    class="fixed inset-0 z-50 flex h-dvh w-screen items-center justify-center overflow-hidden bg-[#f6efe7] p-3 sm:p-6"
  >
    <!-- Dekorasi latar -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f3dcd5,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_#dce5d8,_transparent_50%)]"
    />

    <!-- Frame luar -->
    <section
      class="relative z-10 flex h-full w-full max-w-5xl items-center justify-center border border-[#c6a995]/70 p-1.5 sm:p-3"
    >
      <!-- Frame dalam -->
      <div
        class="relative flex h-full w-full items-center justify-center border border-[#c6a995]/50 bg-[#e9dfd4]/40 p-1.5 sm:p-2"
      >
        <!-- Ornamen sudut -->
        <span class="absolute left-2 top-2 z-20 text-xl text-[#b89a82] sm:left-4 sm:top-4">❧</span>
        <span
          class="absolute right-2 top-2 z-20 -scale-x-100 text-xl text-[#b89a82] sm:right-4 sm:top-4"
          >❧</span
        >
        <span
          class="absolute bottom-2 left-2 z-20 -rotate-90 text-xl text-[#b89a82] sm:bottom-4 sm:left-4"
          >❧</span
        >
        <span
          class="absolute bottom-2 right-2 z-20 rotate-90 text-xl text-[#b89a82] sm:bottom-4 sm:right-4"
          >❧</span
        >

        <!-- Video tanpa crop -->
        <video
          v-if="guest.videoUrl"
          :key="guest.videoUrl"
          class="h-full w-full object-contain"
          :src="guest.videoUrl"
          autoplay
          playsinline
          @ended="emit('finished')"
        />

        <!-- Jika video belum tersedia -->
        <div v-else class="flex h-full w-full items-center justify-center text-sm text-[#826d61]">
          Video opening belum tersedia.
        </div>
      </div>
    </section>
  </main>
</template>
