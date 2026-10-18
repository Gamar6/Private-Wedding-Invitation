<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import PrivacyNotice from './components/invitation/PrivacyNotice.vue'
import PasskeyView, { type Guest } from './components/invitation/PasskeyView.vue'
import InvitationBook from './components/invitation/InvitationBook.vue'
import OpeningVideoView from './components/invitation/OpeningVideoView.vue'
import LandingView from './components/invitation/LandingView.vue'

const route = useRoute()

type InvitationStage = 'privacy' | 'passkey' | 'book' | 'video' | 'landing'

const stage = ref<InvitationStage>('privacy')
const guest = ref<Guest | null>(null)
const weddingAudio = ref<HTMLAudioElement | null>(null)

function continueFromPrivacy() {
  stage.value = 'passkey'
}

function handleVerified(foundGuest: Guest) {
  guest.value = foundGuest
  stage.value = 'book'
}

function openBook() {
  // Mulai lagu saat pengguna membuka buku undangan.
  // Pemanggilan dilakukan sebelum perpindahan halaman.
  const audio = weddingAudio.value

  if (audio && audio.paused) {
    void audio.play().catch((error: unknown) => {
      console.warn('Lagu belum dapat diputar:', error)
    })
  }

  stage.value = 'video'
}

function finishVideo() {
  // Audio tetap berjalan saat masuk ke landing page.
  stage.value = 'landing'
}
</script>

<template>
  <div class="min-h-screen w-full overflow-hidden">
    <!-- Satu pemutar audio untuk seluruh alur undangan -->
    <audio ref="weddingAudio" src="/audio/NadinAmizah-kekal.mp3" preload="auto" loop />

    <!-- Halaman admin -->
    <RouterView v-if="route.path === '/admin'" />

    <!-- Alur undangan -->
    <Transition
      v-else
      mode="out-in"
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <PrivacyNotice v-if="stage === 'privacy'" key="privacy" @continue="continueFromPrivacy" />

      <PasskeyView v-else-if="stage === 'passkey'" key="passkey" @verified="handleVerified" />

      <InvitationBook
        v-else-if="stage === 'book' && guest"
        key="book"
        :guest="guest"
        @opened="openBook"
      />

      <OpeningVideoView
        v-else-if="stage === 'video' && guest"
        key="video"
        :guest="guest"
        @finished="finishVideo"
      />

      <LandingView v-else-if="stage === 'landing' && guest" key="landing" :guest="guest" />
    </Transition>
  </div>
</template>
