
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

export type Guest = {
  passcode: string
  type: 'person' | 'family'
  name: string
  canvasUrl: string
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
    const response = await fetch('/guests.json')

    if (!response.ok) {
      throw new Error('Gagal mengambil guests.json')
    }

    const data = await response.json()

    const foundGuest = data.guests.find(
      (item: Guest) =>
        item.passcode.toLowerCase() === code.toLowerCase(),
    )

    if (!foundGuest) {
      errorMessage.value = 'Invitation code tidak ditemukan.'
      return
    }

    // Kompatibilitas dengan alur lama
    localStorage.setItem('namaUndangan', foundGuest.name)

    emit('verified', foundGuest)
  } catch (error) {
    console.error(error)
    errorMessage.value =
      'Terjadi kesalahan saat membaca data invitation.'
  } finally {
    isLoading.value = false
  }
}

onBeforeUnmount(() => {
  // Tidak ada timer yang perlu dibersihkan
})
</script>

<template>
  <main
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8f3] px-6 text-center text-[#76594f]"
  >
    <!-- Background -->
    <div
      class="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#f8dfe0]/50 blur-3xl"
    />

    <div
      class="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-[#e9e0f4]/50 blur-3xl"
    />

    <section class="relative z-10 flex w-full max-w-md flex-col items-center">
      <!-- Illustration -->
      <div class="mb-6 text-6xl">🎀</div>

      <p class="mb-3 text-[10px] font-medium tracking-[0.35em] text-[#b99a91]">
        PRIVATE INVITATION
      </p>

      <h1 class="font-serif text-5xl font-normal tracking-tight sm:text-6xl">
        Welcome
      </h1>

      <p class="mb-8 mt-4 text-sm text-[#a18a81]">
        Please enter your invitation code
      </p>

      <!-- Input -->
      <input
        v-model="passcode"
        type="text"
        placeholder="Enter invitation code"
        autocomplete="off"
        spellcheck="false"
        :disabled="isLoading"
        class="w-full rounded-2xl border border-[#e7d3cb] bg-white/80 px-5 py-4 text-center font-serif text-[15px] text-[#76594f] outline-none transition duration-300 placeholder:text-[#c3aaa2] focus:border-[#dba6a1] focus:ring-4 focus:ring-[#dfa09e]/10 disabled:opacity-60"
        @keyup.enter="verifyPasscode"
      />

      <!-- Button -->
      <button
        type="button"
        :disabled="isLoading"
        class="mt-4 w-full rounded-full bg-[#76594f] px-7 py-4 font-serif text-sm text-white shadow-lg shadow-[#76594f]/10 transition duration-300 hover:-translate-y-1 hover:bg-[#634a41] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        @click="verifyPasscode"
      >
        {{ isLoading ? 'Checking...' : 'Open Invitation' }}
      </button>

      <!-- Error -->
      <Transition
        enter-active-class="transition duration-300"
        enter-from-class="translate-y-[-5px] opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <p v-if="errorMessage" class="mt-4 text-[13px] text-[#b96d6d]">
          {{ errorMessage }}
        </p>
      </Transition>

      <div class="mt-8 text-[#dba6a1]">♡</div>
    </section>
  </main>
</template>
