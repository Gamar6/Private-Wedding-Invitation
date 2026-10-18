<script setup lang="ts">
import { ref } from 'vue'

export type Guest = {
  id?: string
  passcode: string
  type: 'person' | 'couple' | 'family'
  name: string
  greeting?: string
  videoUrl?: string
  canvasUrl?: string
  hasRsvp?: boolean
  dressCode?: {
    enabled: boolean
    label: string | null
  }
}

const emit = defineEmits<{
  verified: [guest: Guest]
}>()

const passcode = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function verifyPasscode() {
  errorMessage.value = ''

  const code = passcode.value.trim()

  if (!code) {
    errorMessage.value = 'Please enter your invitation code.'
    return
  }

  isLoading.value = true

  try {
    const response = await fetch('/api/verify-passcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passcode: code,
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success || !result.guest) {
      errorMessage.value = result.message || 'Invitation code tidak ditemukan.'
      return
    }

    const guest: Guest = {
      ...result.guest,
      passcode: code,
      hasRsvp: result.guest.hasRsvp === true,
      videoUrl: result.guest.dressCode?.enabled
        ? '/video-dresscode.mp4'
        : '/video-no-dresscode.mp4',
      dressCode: {
        enabled: result.guest.dressCode?.enabled === true,
        label: result.guest.dressCode?.label ?? null,
      },
    }

    localStorage.setItem('namaUndangan', guest.name)

    emit('verified', guest)
  } catch (error) {
    console.error('Passcode verification failed:', error)
    errorMessage.value = 'Unable to verify your invitation. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main
    class="relative flex min-h-screen min-h-dvh items-center justify-center overflow-hidden bg-[#f8eee7] bg-cover bg-center bg-no-repeat px-6 py-8 text-center text-[#76594f]"
    style="background-image: url('/images/bg-passckey.jpeg')"
  >
    <!-- Overlay lembut agar teks mudah dibaca -->
    <div class="pointer-events-none absolute inset-0 bg-[#fff8f3]/25" aria-hidden="true" />

    <!-- Konten passkey -->
    <section
      class="relative z-10 flex w-full max-w-md flex-col items-center rounded-3xl border border-white/50 bg-[#fffaf5]/70 px-6 py-9 shadow-xl shadow-[#76594f]/10 backdrop-blur-sm sm:px-10"
    >
      <!-- Illustration -->
      <div class="mb-5 text-5xl" aria-hidden="true">🎀</div>

      <p class="mb-3 text-[10px] font-medium tracking-[0.35em] text-[#a78378]">
        PRIVATE INVITATION
      </p>

      <h1 class="font-serif text-5xl font-normal tracking-tight text-[#76594f] sm:text-6xl">
        Welcome
      </h1>

      <p class="mb-8 mt-4 text-sm text-[#967d72]">Please enter your invitation code</p>

      <!-- Passcode form -->
      <form class="w-full" @submit.prevent="verifyPasscode">
        <label for="passcode" class="sr-only"> Invitation code </label>

        <input
          id="passcode"
          v-model="passcode"
          type="text"
          placeholder="Enter invitation code"
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
          :disabled="isLoading"
          class="w-full rounded-2xl border border-[#d8bdb0] bg-white/80 px-5 py-4 text-center font-serif text-[15px] text-[#76594f] outline-none transition duration-300 placeholder:text-[#b49c90] focus:border-[#c9948e] focus:ring-4 focus:ring-[#dfa09e]/15 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="submit"
          :disabled="isLoading"
          class="mt-4 w-full rounded-full bg-[#d9a19b] px-7 py-4 font-serif text-sm tracking-wide text-white shadow-lg shadow-[#76594f]/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#bd8983] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isLoading ? 'Checking...' : 'Open Invitation' }}
        </button>
      </form>

      <!-- Error message -->
      <Transition
        enter-active-class="transition duration-300"
        enter-from-class="translate-y-[-5px] opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <p v-if="errorMessage" role="alert" class="mt-4 text-[13px] text-[#b96d6d]">
          {{ errorMessage }}
        </p>
      </Transition>

      <!-- Decorative divider -->
      <div class="mt-7 flex items-center gap-3 text-[#d5a29b]" aria-hidden="true">
        <span class="h-px w-8 bg-current/60" />
        <span class="text-xl">♡</span>
        <span class="h-px w-8 bg-current/60" />
      </div>
    </section>
  </main>
</template>
