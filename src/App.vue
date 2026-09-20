
<script setup lang="ts">
import { ref } from 'vue'

import PrivacyNotice from './components/invitation/PrivacyNotice.vue'
import PasskeyView, {
  type Guest,
} from './components/invitation/PasskeyView.vue'
import InvitationBook from './components/invitation/InvitationBook.vue'
import MentalCanvasView from './components/invitation/MentalCanvasView.vue'

type InvitationStage = 'privacy' | 'passkey' | 'book' | 'canvas'

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
  stage.value = 'canvas'
}
</script>

<template>
  <div class="min-h-screen w-full overflow-hidden">
    <Transition
      mode="out-in"
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Privacy -->
      <PrivacyNotice
        v-if="stage === 'privacy'"
        key="privacy"
        @continue="continueFromPrivacy"
      />

      <!-- Passkey -->
      <PasskeyView
        v-else-if="stage === 'passkey'"
        key="passkey"
        @verified="handleVerified"
      />

      <!-- Book -->
      <InvitationBook
        v-else-if="stage === 'book' && guest"
        key="book"
        :guest="guest"
        @opened="openBook"
      />

      <!-- Mental Canvas -->
      <MentalCanvasView
        v-else-if="stage === 'canvas' && guest"
        key="canvas"
        :guest="guest"
      />
    </Transition>
  </div>
</template>
