<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import type { Guest } from './PasskeyView.vue'

defineProps<{
  guest: Guest
}>()

const emit = defineEmits<{
  opened: []
}>()

const isOpening = ref(false)

let openingTimer: number | null = null

function openBook() {
  if (isOpening.value) return

  isOpening.value = true

  openingTimer = window.setTimeout(() => {
    emit('opened')
  }, 1900)
}

onBeforeUnmount(() => {
  if (openingTimer !== null) {
    clearTimeout(openingTimer)
  }
})
</script>

<template>
  <main
    class="book-screen relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6e9df] px-5 py-10"
  >
    <!-- Background decoration -->
    <div class="pointer-events-none absolute inset-0 opacity-60">
      <div
        class="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#f5d4d0] blur-3xl"
      />

      <div
        class="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#e6d8eb] blur-3xl"
      />
    </div>

    <section
      class="relative z-10 flex w-full max-w-lg flex-col items-center"
    >
      <p
        class="mb-8 text-[10px] font-medium tracking-[0.45em] text-[#ad8e80]"
      >
        OUR LITTLE STORY
      </p>

      <!-- Book -->
      <div
        class="book-scene"
        :class="{ 'is-opening': isOpening }"
      >
        <div class="book-shadow" />

        <div class="book">
          <!-- Pages behind the cover -->
          <div class="book-page book-page-left">
            <div class="page-decoration">♡</div>
          </div>

          <div class="book-page book-page-right">
            <div class="page-decoration">♡</div>
          </div>

          <!-- Cover -->
          <div class="book-cover">
            <div class="cover-inner">
              <p class="cover-eyebrow">
                THE WEDDING OF
              </p>

              <div class="cover-flower">
                🌸
              </div>

              <h1 class="cover-title">
                <span>Fachry &amp; Poppy</span>
              </h1>

              <div class="cover-divider">
                <span>♡</span>
              </div>

              <p class="cover-caption">
                A story of love and forever
              </p>

              <div class="cover-flower bottom">
                🌷
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Open button -->
      <Transition
        enter-active-class="transition duration-500"
        enter-from-class="translate-y-3 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
      >
        <div
          v-if="!isOpening"
          class="mt-12 flex flex-col items-center"
        >
          <p class="mb-4 text-sm italic text-[#a58a7e]">
            A little invitation for you ♡
          </p>

          <button
            type="button"
            class="rounded-full bg-[#d99b99] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-xl shadow-[#d99b99]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#cd8987] active:translate-y-0"
            @click="openBook"
          >
            ✨ Klik untuk Membuka
          </button>
        </div>
      </Transition>

      <!-- Opening text -->
      <Transition
        enter-active-class="transition duration-700"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
      >
        <p
          v-if="isOpening"
          class="mt-12 text-sm italic text-[#a58a7e]"
        >
          Membuka cerita kita... ♡
        </p>
      </Transition>
    </section>
  </main>
</template>

<style scoped>
.book-scene {
  position: relative;
  width: min(78vw, 340px);
  aspect-ratio: 0.72;
  perspective: 1800px;
  perspective-origin: 50% 50%;
}

.book-shadow {
  position: absolute;
  bottom: -18px;
  left: 8%;
  width: 84%;
  height: 24px;
  border-radius: 50%;
  background: rgba(110, 78, 62, 0.2);
  filter: blur(14px);

  transition:
    transform 1.6s ease,
    opacity 1.4s ease,
    filter 1.6s ease;
}

.book {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;

  transition:
    transform 1.8s cubic-bezier(0.65, 0, 0.35, 1);
}

/* Pages */
.book-page {
  position: absolute;
  inset: 0;

  border-radius: 4px 14px 14px 4px;

  background:
    linear-gradient(
      90deg,
      #f9f0e5 0%,
      #fffaf2 8%,
      #fffaf2 92%,
      #f5e8da 100%
    );

  border: 1px solid #ead8c6;

  box-shadow:
    inset 0 0 18px rgba(130, 90, 65, 0.08),
    2px 2px 5px rgba(110, 78, 62, 0.06);

  transition:
    transform 1.8s cubic-bezier(0.65, 0, 0.35, 1),
    filter 1.4s ease,
    opacity 1.2s ease;
}

.book-page-left {
  transform: translateZ(-4px);
}

.book-page-right {
  transform: translateZ(-2px);
}

.page-decoration {
  position: absolute;
  inset: 12%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #e3b4ac;
  font-size: 28px;

  border: 1px solid #efd7c9;

  opacity: 0.75;
}

/* Cover */
.book-cover {
  position: absolute;
  inset: 0;
  z-index: 3;

  transform-origin: left center;
  transform-style: preserve-3d;

  border-radius: 4px 14px 14px 4px;

  background:
    linear-gradient(
      135deg,
      #efc2c0 0%,
      #eab6b4 48%,
      #e4aaa9 100%
    );

  border: 1px solid #d49c9b;

  box-shadow:
    8px 8px 0 #d39c99,
    12px 15px 20px rgba(108, 72, 65, 0.18);

  transition:
    transform 1.8s cubic-bezier(0.65, 0, 0.35, 1),
    box-shadow 1.8s ease,
    filter 1.2s ease;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.cover-inner {
  position: absolute;
  inset: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 248, 240, 0.65);
  border-radius: 2px 10px 10px 2px;

  padding: 24px 16px;

  text-align: center;

  color: #79554d;

  transform: translateZ(1px);
}

.cover-eyebrow {
  font-size: 9px;
  letter-spacing: 0.28em;
  color: #a87872;
}

.cover-flower {
  margin-top: 24px;
  font-size: 40px;
}

.cover-title {
  margin-top: 22px;

  font-family: Georgia, serif;

  font-size: 29px;
  font-weight: 400;
  line-height: 1.45;

  color: #76534b;
}

.cover-title span {
  font-style: italic;
}

.cover-divider {
  margin-top: 20px;

  display: flex;
  align-items: center;
  gap: 10px;

  color: #a87872;
}

.cover-divider::before,
.cover-divider::after {
  content: '';

  display: block;

  width: 30px;
  height: 1px;

  background: rgba(168, 120, 114, 0.45);
}

.cover-caption {
  margin-top: 16px;

  font-family: Georgia, serif;

  font-size: 11px;
  font-style: italic;

  color: #a87872;
}

.cover-flower.bottom {
  margin-top: 20px;
  font-size: 28px;
}

/* Opening Animation */
.book-scene.is-opening .book {
  transform: translateZ(4px) scale(1.015);
}

.book-scene.is-opening .book-cover {
  transform: rotateY(-178deg);

  box-shadow:
    0 0 0 rgba(108, 72, 65, 0);

  filter: brightness(0.98);
}

.book-scene.is-opening .book-page-left {

  transform: translateZ(-4px) translateX(-1px);
}

.book-scene.is-opening .book-page-right {

  transform:
    translateZ(-2px)
    rotateY(-4deg)
    translateX(1px);
}

.book-scene.is-opening .book-shadow {
  transform: scaleX(0.72) translateY(3px);
  opacity: 0.45;
  filter: blur(18px);
}

@media (prefers-reduced-motion: reduce) {
  .book,
  .book-cover,
  .book-page,
  .book-shadow {
    transition-duration: 0.2s;
  }
}
</style>
