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

function continueFromPrivacy() {
  stage.value = 'passkey'
}

function handleVerified(foundGuest: Guest) {
  guest.value = foundGuest
  stage.value = 'book'
}

function openBook() {
  stage.value = 'video'
}

function finishVideo() {
  stage.value = 'landing'
}
</script>

<template>
  <div class="min-h-screen w-full overflow-hidden">
    <!-- 🟢 3. Jika halaman yang dibuka adalah /admin, tampilkan RouterView -->
    <RouterView v-if="route.path === '/admin'" />

    <!-- 🟢 4. Jika bukan /admin, jalankan flow undangan seperti biasa -->
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
