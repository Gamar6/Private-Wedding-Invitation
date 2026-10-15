<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Guest } from './PasskeyView.vue'

defineProps<{ guest: Guest }>()

const stories = [
  { title: 'Awal Bertemu', subtitle: 'Every story has a beginning.', tone: 'from-[#dce6dc] to-[#f2ded3]' },
  { title: 'Awal Pacaran', subtitle: 'A friendship turned into something more.', tone: 'from-[#ead8d7] to-[#f6e9db]' },
  { title: 'First Date', subtitle: 'Small moments, lasting memories.', tone: 'from-[#e7dfd0] to-[#d4e1d9]' },
  { title: 'The Proposal', subtitle: 'One question, a lifetime of answers.', tone: 'from-[#e9d6c9] to-[#e1e5d7]' },
  { title: 'Until Forever', subtitle: 'And so our next chapter begins.', tone: 'from-[#d9e3d8] to-[#f0dcd7]' },
]

const activeStory = ref(0)
let carouselTimer: ReturnType<typeof setInterval> | undefined
let countdownTimer: ReturnType<typeof setInterval> | undefined

const now = ref(Date.now())
const weddingDate = new Date('2026-11-14T08:00:00+07:00').getTime()

const countdown = computed(() => {
  const distance = Math.max(0, weddingDate - now.value)
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1000),
  }
})

const attendance = ref('')
const message = ref('')
const submitted = ref(false)

function changeStory(direction: number) {
  activeStory.value =
    (activeStory.value + direction + stories.length) % stories.length
}

let touchStartX = 0

function startTouch(event: TouchEvent) {
  touchStartX = event.changedTouches[0]?.clientX ?? 0
}

function endTouch(event: TouchEvent) {
  const touchEndX = event.changedTouches[0]?.clientX ?? 0
  const delta = touchEndX - touchStartX

  if (Math.abs(delta) > 45) changeStory(delta < 0 ? 1 : -1)
}

function submitPreviewRsvp() {
  if (!attendance.value) return
  submitted.value = true
}

onMounted(() => {
  carouselTimer = setInterval(() => changeStory(1), 5000)
  countdownTimer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (carouselTimer) clearInterval(carouselTimer)
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#fbf8f2] text-[#57483f]">
    <!-- Hero -->
    <section id="home" class="relative flex min-h-[92svh] flex-col items-center justify-center px-6 py-16 text-center">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f1dfd5,_transparent_52%),radial-gradient(ellipse_at_bottom,_#e1e8dc,_transparent_48%)]" />

      <div class="relative z-10">
        <p class="text-[10px] uppercase tracking-[0.45em] text-[#927b6d]">
          Together with our families
        </p>
        <p class="mt-10 font-serif text-sm italic text-[#947d6e]">
          The Wedding Of
        </p>
        <h1 class="mt-5 font-serif text-6xl font-normal leading-[1.1] tracking-tight sm:text-7xl">
          Fachry
          <span class="my-2 block text-3xl italic text-[#b48c7b]">&</span>
          Poppy
        </h1>

        <div class="mx-auto my-7 flex items-center justify-center gap-4 text-[#b18b77]">
          <span class="h-px w-12 bg-[#c9ac99]" />
          <span>✳</span>
          <span class="h-px w-12 bg-[#c9ac99]" />
        </div>

        <p class="font-serif text-lg tracking-wide">14 · 11 · 2026</p>
        <p class="mt-3 text-xs tracking-[0.2em] text-[#8d7b6f]">
          A NEW CHAPTER BEGINS
        </p>

        <a href="#story" class="mt-12 inline-flex items-center gap-3 rounded-full border border-[#cbb6a6] px-6 py-3 text-xs tracking-wide transition hover:bg-white/50">
          Discover our story <span>↓</span>
        </a>
      </div>

      <span class="absolute bottom-6 text-[9px] tracking-[0.3em] text-[#9d897b]">
        WITH LOVE, FACHRY & POPPY
      </span>
    </section>

    <!-- Personal greeting -->
    <section class="px-6 py-16 text-center">
      <p class="text-[10px] uppercase tracking-[0.35em] text-[#aa8d7c]">
        A personal invitation
      </p>
      <h2 class="mt-5 font-serif text-3xl italic">
        Dear, {{ guest.name }}
      </h2>
      <p class="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#85746a]">
        {{ guest.greeting || 'It would mean so much to have you with us on our special day.' }}
      </p>
      <p class="mt-5 font-serif text-xl text-[#b18c78]">With love, ♡</p>
    </section>

    <!-- Love story carousel -->
    <section id="story" class="bg-[#f2ede4] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-xl text-center">
        <p class="text-[10px] uppercase tracking-[0.4em] text-[#9d8171]">
          Chapters of us
        </p>
        <h2 class="mt-4 font-serif text-4xl italic">Our Love Story</h2>
        <p class="mt-3 text-xs leading-6 text-[#928075]">
          Five little chapters, one beautiful journey.
        </p>

        <div
          class="relative mt-9"
          @touchstart="startTouch"
          @touchend="endTouch"
        >
          <div class="relative mx-auto flex h-[370px] items-center justify-center">
            <div
              v-for="(story, index) in stories"
              :key="story.title"
              class="absolute w-[67%] max-w-[270px] transition-all duration-500 ease-out"
              :class="{
                'z-20 scale-100 opacity-100': index === activeStory,
                'z-10 -translate-x-[72%] scale-90 opacity-45': index === (activeStory + stories.length - 1) % stories.length,
                'z-10 translate-x-[72%] scale-90 opacity-45': index === (activeStory + 1) % stories.length,
                'pointer-events-none scale-75 opacity-0': index !== activeStory && index !== (activeStory + 1) % stories.length && index !== (activeStory + stories.length - 1) % stories.length,
              }"
            >
              <div
                class="relative aspect-[3/4] overflow-hidden rounded-t-[48%] border-[5px] border-white bg-gradient-to-br shadow-xl shadow-[#786658]/10"
                :class="story.tone"
              >
                <div class="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                  <span class="font-serif text-5xl italic text-[#876e5e]/40">
                    0{{ index + 1 }}
                  </span>
                  <span class="mt-5 text-4xl text-white/90">✳</span>
                  <p class="mt-5 font-serif text-lg italic text-[#69564b]">
                    {{ story.title }}
                  </p>
                  <p class="mt-2 max-w-[180px] text-[10px] leading-5 text-[#78665b]">
                    {{ story.subtitle }}
                  </p>
                  <span class="absolute bottom-5 text-lg text-[#a98776]">♡</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center gap-8">
            <button aria-label="Previous story" class="flex h-10 w-10 items-center justify-center rounded-full border border-[#cdb9a8] transition hover:bg-white" @click="changeStory(-1)">
              ←
            </button>
            <span class="text-[10px] tracking-[0.25em] text-[#917b6d]">
              {{ String(activeStory + 1).padStart(2, '0') }} / {{ String(stories.length).padStart(2, '0') }}
            </span>
            <button aria-label="Next story" class="flex h-10 w-10 items-center justify-center rounded-full border border-[#cdb9a8] transition hover:bg-white" @click="changeStory(1)">
              →
            </button>
          </div>
          <div class="mt-5 flex justify-center gap-2">
            <button
              v-for="(story, index) in stories"
              :key="story.title"
              :aria-label="`Show ${story.title}`"
              class="h-1.5 rounded-full transition-all"
              :class="index === activeStory ? 'w-7 bg-[#987866]' : 'w-1.5 bg-[#cdbbad]'"
              @click="activeStory = index"
            />
          </div>
        </div>
        <p class="mt-5 text-[10px] italic text-[#a18c7e]">
          Illustrations are temporary placeholders.
        </p>
      </div>
    </section>

    <!-- Couple -->
    <section class="px-6 py-16 text-center">
      <p class="text-[10px] uppercase tracking-[0.4em] text-[#a38a79]">
        Two hearts, one promise
      </p>
      <div class="mx-auto mt-8 max-w-md space-y-9">
        <div class="rounded-t-[48%] border border-[#e9ddd0] bg-gradient-to-b from-[#dfe8df] to-[#f6e9de] px-6 pb-7 pt-10">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/80 bg-white/35 font-serif text-2xl italic">F</div>
          <h3 class="mt-5 font-serif text-3xl italic">Fachry</h3>
          <p class="mt-3 text-xs leading-6 text-[#837166]">
            Putra dari Bapak [Nama Ayah] & Ibu [Nama Ibu]
          </p>
        </div>
        <p class="font-serif text-3xl italic text-[#b18c78]">&</p>
        <div class="rounded-t-[48%] border border-[#e9ddd0] bg-gradient-to-b from-[#f0dcd5] to-[#f8f1e8] px-6 pb-7 pt-10">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/80 bg-white/35 font-serif text-2xl italic">P</div>
          <h3 class="mt-5 font-serif text-3xl italic">Poppy</h3>
          <p class="mt-3 text-xs leading-6 text-[#837166]">
            Putri dari Bapak [Nama Ayah] & Ibu [Nama Ibu]
          </p>
        </div>
      </div>
      <p class="mx-auto mt-9 max-w-sm text-sm italic leading-7 text-[#8d796d]">
        “And above all these put on love, which binds everything together in perfect harmony.”
      </p>
    </section>

    <!-- Event -->
    <section id="event" class="bg-[#e8ece3] px-6 py-16">
      <div class="mx-auto max-w-lg text-center">
        <p class="text-[10px] uppercase tracking-[0.4em] text-[#7d8978]">
          Save the date
        </p>
        <h2 class="mt-4 font-serif text-4xl italic">The Wedding Day</h2>
        <p class="mt-4 text-sm leading-7 text-[#788071]">
          With gratitude and joy, we invite you to witness the beginning of our forever.
        </p>

        <div class="mt-9 border-y border-[#c6d0c0] py-7">
          <p class="text-[10px] uppercase tracking-[0.3em] text-[#7f8b78]">Akad Nikah</p>
          <p class="mt-4 font-serif text-2xl">Saturday</p>
          <p class="mt-1 font-serif text-5xl">14</p>
          <p class="mt-1 text-xs uppercase tracking-[0.25em]">November 2026</p>
          <p class="mt-5 text-sm">08.00 WIB – selesai</p>
          <div class="mx-auto my-6 h-px w-12 bg-[#aab6a2]" />
          <h3 class="font-serif text-xl">Masjid Raya Al-Mi'raj</h3>
          <p class="mx-auto mt-3 max-w-xs text-xs leading-6 text-[#788071]">
            Jl. Raya Pajajaran No. 10, RT 2/RW 6, Baranangsiang, Bogo, Jawa Barat, 16143
          </p>
          <a
            href="https://share.google/qAPYeR3UJZYJoHeXA"
            target="_blank"
            rel="noreferrer"
            class="mt-5 inline-flex rounded-full border border-[#9da994] px-5 py-3 text-xs transition hover:bg-white/50"
          >
            Open Google Maps ↗
          </a>
        </div>

        <div class="mt-7 overflow-hidden rounded-xl border border-white/80 bg-white/60 p-2">
          <iframe
            title="Map to Masjid Raya Al-Mi'raj"
            class="h-56 w-full rounded-lg border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Masjid%20Raya%20Al-Mi%27raj%2C%20Jl.%20Raya%20Pajajaran%20No.%2010%2C%20Baranangsiang&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
        </div>

        <p class="mt-10 text-[10px] uppercase tracking-[0.35em] text-[#7d8978]">
          Counting down to forever
        </p>
        <div class="mt-5 grid grid-cols-4 gap-2">
          <div v-for="unit in [
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.minutes },
            { label: 'Seconds', value: countdown.seconds },
          ]" :key="unit.label" class="rounded-xl border border-white/80 bg-white/50 px-1 py-4">
            <p class="font-serif text-2xl tabular-nums">{{ String(unit.value).padStart(2, '0') }}</p>
            <p class="mt-1 text-[9px] uppercase tracking-wide text-[#7f8b78]">{{ unit.label }}</p>
          </div>
        </div>

        <div v-if="guest.dressCode?.enabled" class="mt-8 rounded-xl border border-[#c6d0c0] bg-white/35 px-5 py-5">
          <p class="text-[10px] uppercase tracking-[0.3em] text-[#7f8b78]">Dress Code</p>
          <p class="mt-3 font-serif text-2xl italic">{{ guest.dressCode.label || 'Berkain' }}</p>
        </div>
      </div>
    </section>

    <!-- RSVP prototype -->
    <section id="rsvp" class="px-6 py-16">
      <div class="mx-auto max-w-md text-center">
        <p class="text-[10px] uppercase tracking-[0.4em] text-[#a38a79]">
          Kindly respond
        </p>
        <h2 class="mt-4 font-serif text-4xl italic">RSVP</h2>
        <p class="mt-4 text-sm leading-7 text-[#89766b]">
          Your presence would be a gift to us. Please let us know if you can join.
        </p>

        <form v-if="!submitted" class="mt-8 space-y-4 text-left" @submit.prevent="submitPreviewRsvp">
          <label class="block text-xs text-[#766459]">
            Attendance
            <select v-model="attendance" required class="mt-2 w-full rounded-xl border border-[#e3d7ca] bg-white px-4 py-4 text-sm outline-none focus:border-[#aa8b77]">
              <option value="" disabled>Please choose</option>
              <option value="attending">Joyfully accepts</option>
              <option value="not_attending">Regretfully declines</option>
            </select>
          </label>
          <label class="block text-xs text-[#766459]">
            A message for the couple
            <textarea v-model="message" maxlength="1000" rows="4" placeholder="Write your wishes here..." class="mt-2 w-full resize-y rounded-xl border border-[#e3d7ca] bg-white px-4 py-4 text-sm outline-none placeholder:text-[#b9aaa0] focus:border-[#aa8b77]" />
          </label>
          <button type="submit" class="w-full rounded-full bg-[#72594c] px-6 py-4 text-sm tracking-wide text-white transition hover:bg-[#5f483d]">
            Submit RSVP
          </button>
        </form>

        <div v-else class="mt-8 rounded-2xl border border-[#e3d7ca] bg-white/70 p-6">
          <p class="font-serif text-2xl italic">Thank you ♡</p>
          <p class="mt-3 text-sm leading-6 text-[#89766b]">
            This is a design preview. Your response has not been sent or saved yet.
          </p>
          <button class="mt-4 text-xs underline" @click="submitted = false">Edit preview response</button>
        </div>
      </div>
    </section>

    <!-- Gift -->
    <section id="gift" class="bg-[#f2ede4] px-6 py-16 text-center">
      <div class="mx-auto max-w-md">
        <p class="text-[10px] uppercase tracking-[0.4em] text-[#a38a79]">
          A little kindness
        </p>
        <h2 class="mt-4 font-serif text-4xl italic">Wedding Gift</h2>
        <p class="mt-4 text-sm leading-7 text-[#89766b]">
          Your prayers and presence are the most meaningful gifts. If you wish to share something more, you may use the details below.
        </p>

        <div class="mt-8 rounded-2xl border border-[#e0d2c4] bg-[#fbf8f2] p-6">
          <div class="mx-auto flex aspect-square w-36 max-w-full items-center justify-center border border-dashed border-[#c9b5a4] bg-[#f2ede4]">
            <div class="text-center">
              <span class="text-3xl">♡</span>
              <p class="mt-2 text-[9px] uppercase tracking-widest">QRIS placeholder</p>
            </div>
          </div>
          <p class="mt-4 text-xs text-[#948175]">
            QRIS image will be added later.
          </p>
        </div>

        <div class="mt-5 rounded-2xl border border-[#e0d2c4] bg-white/50 p-6">
          <p class="text-[10px] uppercase tracking-[0.3em] text-[#a38a79]">Physical Gift</p>
          <p class="mt-4 font-serif text-lg">Recipient / Address</p>
          <p class="mt-2 text-xs leading-6 text-[#89766b]">
            Gift recipient and delivery address will be added after confirmation.
          </p>
        </div>
      </div>
    </section>

    <!-- Closing -->
    <footer class="relative overflow-hidden px-6 py-20 text-center">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#eadfd5,_transparent_65%)]" />
      <div class="relative z-10 mx-auto max-w-md">
        <span class="text-3xl text-[#b18c78]">❧</span>
        <p class="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#a38a79]">
          Until we meet
        </p>
        <h2 class="mt-5 font-serif text-4xl italic">With love, always.</h2>
        <p class="mt-5 text-sm leading-7 text-[#89766b]">
          Thank you for being part of our story. We look forward to sharing this special day with you.
        </p>
        <div class="mx-auto my-8 h-px w-16 bg-[#d3bcaa]" />
        <p class="font-serif text-2xl italic">Fachry & Poppy</p>
        <p class="mt-3 text-xs tracking-[0.2em] text-[#a38a79]">14 · 11 · 2026</p>
        <p class="mt-12 text-[10px] tracking-wide text-[#9c897b]">
          Crafted with love by
        </p>
        <p class="mt-2 font-serif text-lg italic">Gamar × Eka</p>
        <div class="mt-4 flex justify-center gap-5 text-xs text-[#89766b]">
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" class="underline underline-offset-4">Gamar on Instagram</a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" class="underline underline-offset-4">Eka on Instagram</a>
        </div>
      </div>
    </footer>

    <!-- Simple mobile navigation -->
    <nav class="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/80 bg-[#fbf8f2]/90 p-1.5 shadow-lg shadow-[#5e4d40]/10 backdrop-blur-lg">
      <a href="#home" class="rounded-full px-3 py-2 text-[10px] hover:bg-[#e8ece3]">Home</a>
      <a href="#story" class="rounded-full px-3 py-2 text-[10px] hover:bg-[#e8ece3]">Story</a>
      <a href="#event" class="rounded-full px-3 py-2 text-[10px] hover:bg-[#e8ece3]">Event</a>
      <a href="#rsvp" class="rounded-full bg-[#72594c] px-4 py-2 text-[10px] text-white">RSVP</a>
    </nav>
  </main>
</template>
