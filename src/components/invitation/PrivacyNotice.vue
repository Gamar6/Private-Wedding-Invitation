
<script setup lang="ts">
const emit = defineEmits<{
  continue: []
}>()
</script>

<template>
  <main
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8f3] px-5 py-10 text-[#66534b]"
  >
    <!-- Decorative blobs -->
    <div
      class="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#f8dfe0]/60 blur-3xl"
    />
    <div
      class="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-[#eadff4]/60 blur-3xl"
    />

    <!-- Floral decorations -->
    <div class="pointer-events-none absolute left-4 top-4 text-4xl opacity-70">
      🌷
    </div>

    <div class="pointer-events-none absolute right-5 top-8 text-3xl opacity-60">
      🌿
    </div>

    <div class="pointer-events-none absolute bottom-5 left-5 text-3xl opacity-60">
      🌸
    </div>

    <div class="pointer-events-none absolute bottom-8 right-5 text-4xl opacity-70">
      🌷
    </div>

    <!-- Content -->
    <section class="relative z-10 w-full max-w-md text-center">
      <!-- Illustration -->
      <div class="mb-6 flex justify-center">
        <div
          class="flex h-28 w-28 items-center justify-center rounded-full bg-[#f9e2df] shadow-inner shadow-[#e8c2bd]/30"
        >
          <span class="text-6xl">💌</span>
        </div>
      </div>

      <!-- Eyebrow -->
      <p class="mb-3 text-[10px] font-medium tracking-[0.35em] text-[#b99a91]">
        A LITTLE NOTE
      </p>

      <!-- Title -->
      <h1
        class="font-serif text-4xl leading-tight text-[#76594f] sm:text-5xl"
      >
        Pemberitahuan
        <br />
        <span class="italic">Privasi Undangan</span>
      </h1>

      <div class="my-6 flex items-center justify-center gap-3 text-[#dba6a1]">
        <span class="h-px w-16 bg-[#e8c4be]" />
        <span>♡</span>
        <span class="h-px w-16 bg-[#e8c4be]" />
      </div>

      <!-- Description -->
      <p class="text-sm leading-7 text-[#8b756c]">
        Undangan ini bersifat pribadi dan ditujukan khusus untuk Anda.
        Kami sangat menghargai jika Anda menjaga privasi momen istimewa
        ini.
      </p>

      <!-- Reminders -->
      <div
        class="mt-7 rounded-3xl border border-[#efd8d0] bg-white/60 p-5 shadow-sm backdrop-blur-sm"
      >
        <div class="grid grid-cols-3 gap-3">
          <div class="flex flex-col items-center gap-2">
            <div class="text-2xl">🤍</div>
            <p class="text-[11px] leading-4 text-[#8b756c]">
              Jangan
              <br />
              menyebarkan
            </p>
          </div>

          <div class="flex flex-col items-center gap-2">
            <div class="text-2xl">📷</div>
            <p class="text-[11px] leading-4 text-[#8b756c]">
              Hormati
              <br />
              privasi
            </p>
          </div>

          <div class="flex flex-col items-center gap-2">
            <div class="text-2xl">🌷</div>
            <p class="text-[11px] leading-4 text-[#8b756c]">
              Jaga momen
              <br />
              istimewa
            </p>
          </div>
        </div>
      </div>

      <!-- Footer message -->
      <p class="mt-7 font-serif text-sm italic text-[#b08b82]">
        Terima kasih atas pengertian dan perhatiannya ♡
      </p>

      <!-- Continue -->
      <button
        type="button"
        class="mt-7 w-full rounded-full bg-[#dfa09e] px-6 py-4 text-sm font-medium tracking-wide text-white shadow-lg shadow-[#dfa09e]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#d48e8c] active:translate-y-0"
        @click="emit('continue')"
      >
        Saya Mengerti & Lanjutkan
        <span class="ml-2">→</span>
      </button>
    </section>
  </main>
</template>
