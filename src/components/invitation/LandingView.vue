<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Guest } from './PasskeyView.vue'

const props = defineProps<{ guest: Guest }>()

const stories = [
  {
    title: 'Makan Bakso',
    subtitle: 'bhappp',
    image: '/images/Abis-makan-bakso.jpg',
    tone: 'from-[#dce6dc] to-[#f2ded3]',
  },
  {
    title: 'Awal Pacaran',
    subtitle: 'A friendship turned into something more.',
    image: '/images/Fachri-dan-rambut-panjangnya-yang-di-kuncir.jpg',
    tone: 'from-[#ead8d7] to-[#f6e9db]',
  },
  {
    title: 'First Date',
    subtitle: 'Small moments, lasting memories.',
    image: '/images/Foto-pertama-kita.jpg',
    tone: 'from-[#e7dfd0] to-[#d4e1d9]',
  },
  {
    title: 'The Proposal',
    subtitle: 'One question, a lifetime of answers.',
    image: '/images/Jaman-covid-makan-bubur-pagi-pagi-di-Galaxy.jpg',
    tone: 'from-[#e9d6c9] to-[#e1e5d7]',
  },
  {
    title: 'Until Forever',
    subtitle: 'And so our next chapter begins.',
    image: '/images/Kebiasaan-awal-pacaran-(masih-punya-energi-bolak-balik-Bogor-Bekasi-wkwk).jpg',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
]

const activeStory = ref(0)
const now = ref(Date.now())
const weddingDate = new Date('2026-11-14T08:00:00+07:00').getTime()
const attendance = ref('')
const message = ref('')
const submitted = ref(false)

let carouselTimer: ReturnType<typeof setInterval> | undefined
let countdownTimer: ReturnType<typeof setInterval> | undefined
let revealObserver: IntersectionObserver | undefined
let touchStartX = 0

function changeStory(direction: number) {
  activeStory.value = (activeStory.value + direction + stories.length) % stories.length
}
function startTouch(event: TouchEvent) {
  touchStartX = event.changedTouches[0]?.clientX ?? 0
}
function endTouch(event: TouchEvent) {
  const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX
  if (Math.abs(delta) > 45) changeStory(delta < 0 ? 1 : -1)
}
function submitPreviewRsvp() {
  if (attendance.value) submitted.value = true
}

const countdown = computed(() => {
  const d = Math.max(0, weddingDate - now.value)
  return [
    { label: 'Days', value: Math.floor(d / 86_400_000) },
    { label: 'Hours', value: Math.floor((d % 86_400_000) / 3_600_000) },
    { label: 'Minutes', value: Math.floor((d % 3_600_000) / 60_000) },
    { label: 'Seconds', value: Math.floor((d % 60_000) / 1000) },
  ]
})

function setupScrollReveal() {
  const sections = document.querySelectorAll<HTMLElement>('.scroll-reveal')
  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('is-visible'))
    return
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting))
    },
    { threshold: 0.12, rootMargin: '0px 0px -35px 0px' },
  )
  sections.forEach((section) => revealObserver?.observe(section))
}

onMounted(() => {
  carouselTimer = setInterval(() => changeStory(1), 5000)
  countdownTimer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
  setupScrollReveal()
})

onUnmounted(() => {
  if (carouselTimer) clearInterval(carouselTimer)
  if (countdownTimer) clearInterval(countdownTimer)
  revealObserver?.disconnect()
})
</script>

<template>
  <main class="invitation-page min-h-screen overflow-hidden bg-[#fbf8f2] text-[#57483f]">
    <!-- HERO SECTION -->
    <!-- HERO SECTION -->
    <section
      id="home"
      class="hero-section scroll-reveal relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      <div class="hero-wash pointer-events-none absolute inset-0" />

      <!-- Aset Akar/Dedaunan di Sudut Utama Section (Rame & Membumi) -->
      <img
        src="/images/botanical-corner.svg"
        alt=""
        aria-hidden="true"
        class="hero-sprig hero-sprig--tl"
      />
      <img
        src="/images/leaf-sprig.svg"
        alt=""
        aria-hidden="true"
        class="hero-sprig hero-sprig--bl"
      />
      <img
        src="/images/botanical-corner.svg"
        alt=""
        aria-hidden="true"
        class="hero-sprig hero-sprig--tr"
      />
      <img
        src="/images/leaf-sprig.svg"
        alt=""
        aria-hidden="true"
        class="hero-sprig hero-sprig--br"
      />

      <div class="relative z-10 mx-auto max-w-sm sm:max-w-md w-full">
        <!-- FRAME AKAR & DEDAUNAN LINGKUP NAMA -->
        <div
          class="hero-root-frame relative px-6 py-14 rounded-[44px] border border-[#c2b29f]/30 bg-white/45 backdrop-blur-[3px] shadow-sm overflow-hidden"
        >
          <!-- Background Image Samar-samar dalam Frame dengan Gradasi Pudar (Bawah Jelas -> Atas Pudar) -->
          <div
            class="absolute inset-0 bg-cover opacity-30 bg-center pointer-events-none [mask-image:linear-gradient(to_top,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_80%)] [-webkit-mask-image:linear-gradient(to_top,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_80%)]"
            style="background-image: url('/images/bg-membumi.png')"
          />

          <!-- ORNAMEN BINGKAI AKAR / DEDAUNAN SVG (TOP & BOTTOM) -->
          <!-- Top Botanical Crest -->
          <svg
            class="botanical-crest botanical-crest--top"
            viewBox="0 0 300 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 50 Q 75 15, 150 25 T 290 50"
              stroke="#7a8b75"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M30 42 Q 90 20, 150 30 T 270 42"
              stroke="#a2b39c"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <!-- Leaves Left -->
            <ellipse
              cx="45"
              cy="35"
              rx="12"
              ry="5"
              transform="rotate(-25 45 35)"
              fill="#7a8b75"
              opacity="0.75"
            />
            <ellipse
              cx="75"
              cy="24"
              rx="14"
              ry="6"
              transform="rotate(-15 75 24)"
              fill="#8a9b85"
              opacity="0.85"
            />
            <ellipse
              cx="110"
              cy="22"
              rx="15"
              ry="6.5"
              transform="rotate(-8 110 22)"
              fill="#687864"
              opacity="0.8"
            />
            <!-- Leaves Right -->
            <ellipse
              cx="255"
              cy="35"
              rx="12"
              ry="5"
              transform="rotate(25 255 35)"
              fill="#7a8b75"
              opacity="0.75"
            />
            <ellipse
              cx="225"
              cy="24"
              rx="14"
              ry="6"
              transform="rotate(15 225 24)"
              fill="#8a9b85"
              opacity="0.85"
            />
            <ellipse
              cx="190"
              cy="22"
              rx="15"
              ry="6.5"
              transform="rotate(8 190 22)"
              fill="#687864"
              opacity="0.8"
            />
            <!-- Center Flourish -->
            <circle cx="150" cy="25" r="4" fill="#a88272" />
          </svg>

          <!-- Bottom Botanical Crest -->
          <svg
            class="botanical-crest botanical-crest--bottom"
            viewBox="0 0 300 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 10 Q 75 45, 150 35 T 290 10"
              stroke="#7a8b75"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M30 18 Q 90 40, 150 30 T 270 18"
              stroke="#a2b39c"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <!-- Leaves Left -->
            <ellipse
              cx="45"
              cy="25"
              rx="12"
              ry="5"
              transform="rotate(25 45 25)"
              fill="#7a8b75"
              opacity="0.75"
            />
            <ellipse
              cx="75"
              cy="36"
              rx="14"
              ry="6"
              transform="rotate(15 75 36)"
              fill="#8a9b85"
              opacity="0.85"
            />
            <ellipse
              cx="110"
              cy="38"
              rx="15"
              ry="6.5"
              transform="rotate(8 110 38)"
              fill="#687864"
              opacity="0.8"
            />
            <!-- Leaves Right -->
            <ellipse
              cx="255"
              cy="25"
              rx="12"
              ry="5"
              transform="rotate(-25 255 25)"
              fill="#7a8b75"
              opacity="0.75"
            />
            <ellipse
              cx="225"
              cy="36"
              rx="14"
              ry="6"
              transform="rotate(-15 225 36)"
              fill="#8a9b85"
              opacity="0.85"
            />
            <ellipse
              cx="190"
              cy="38"
              rx="15"
              ry="6.5"
              transform="rotate(-8 190 38)"
              fill="#687864"
              opacity="0.8"
            />
            <!-- Center Flourish -->
            <circle cx="150" cy="35" r="4" fill="#a88272" />
          </svg>

          <!-- Konten Teks Nama -->
          <div class="relative z-10 my-2">
            <p class="font-serif text-sm italic text-[#947d6e]">The Wedding Of</p>
            <h1
              class="mt-4 font-serif text-5xl font-normal leading-[1.15] tracking-tight sm:text-6xl text-[#57483f]"
            >
              Fachri <span class="my-2 block text-3xl italic text-[#b48c7b]">&amp;</span> Poppy
            </h1>

            <div class="mx-auto my-5 flex items-center justify-center gap-3 text-[#b18b77]">
              <span class="h-px w-10 bg-[#c9ac99]" />
              <span aria-hidden="true" class="text-xs">🌿</span>
              <span class="h-px w-10 bg-[#c9ac99]" />
            </div>

            <p class="font-serif text-lg tracking-wide text-[#57483f]">14 · 11 · 2026</p>
            <p class="mt-2 text-[10px] tracking-[0.25em] text-[#8d7b6f]">A NEW CHAPTER BEGINS</p>
          </div>
        </div>

        <a
          href="#story"
          class="mt-10 inline-flex items-center gap-3 rounded-full border border-[#cbb6a6] bg-white/50 px-6 py-3 text-xs tracking-wide transition-all hover:bg-white/80 shadow-sm"
        >
          Discover our story <span aria-hidden="true">↓</span>
        </a>
      </div>

      <span class="absolute bottom-6 z-10 text-[9px] tracking-[0.3em] text-[#9d897b]">
        WITH LOVE, FACHRI &amp; POPPY
      </span>
      <span class="soil-line" aria-hidden="true" />
    </section>
    <!-- INVITATION LETTER SECTION (SURAT KLASIK SIMPEL) -->
    <section
      id="invitation-letter"
      class="letter-section scroll-reveal relative overflow-hidden px-5 py-20 sm:px-8"
    >
      <img
        src="/images/leaf-sprig.svg"
        alt=""
        aria-hidden="true"
        class="letter-sprig letter-sprig--left"
      />
      <img
        src="/images/botanical-corner.svg"
        alt=""
        aria-hidden="true"
        class="letter-sprig letter-sprig--right"
      />

      <div class="relative z-10 mx-auto max-w-lg text-center">
        <p class="eyebrow">A letter for you</p>
        <h2 class="mt-2 font-serif text-3xl italic text-[#6f5545]">Especially for you</h2>

        <!-- LEMBARAN SURAT KLASIK BERBINGKAI -->
        <article
          class="classic-letter-card mt-8 relative rounded-2xl border border-[#d8c5b2] bg-[#fffaf3] p-8 sm:p-10 shadow-sm"
        >
          <!-- Double border inner line -->
          <div class="classic-letter-inner p-6 rounded-xl border border-[#e5d8cb] relative">
            <img
              src="/images/leaf-sprig.svg"
              alt=""
              aria-hidden="true"
              class="absolute -right-4 -bottom-4 w-20 opacity-15 pointer-events-none rotate-12"
            />

            <p class="text-[9px] uppercase tracking-[0.3em] text-[#a38a79]">Personal Invitation</p>

            <h3 class="mt-4 break-words font-serif text-3xl italic text-[#674c3d]">
              Dear, {{ props.guest.name }}
            </h3>

            <div class="mx-auto my-5 h-px w-12 bg-[#cdb5a0]" />

            <p class="text-sm leading-8 text-[#85746a]">
              {{
                props.guest.greeting ||
                'It would mean so much to have you with us on our special day.'
              }}
            </p>

            <p class="mt-8 font-serif text-base italic text-[#9b7863]">With love,</p>
            <p class="mt-1 font-serif text-xl text-[#674c3d]">Fachri &amp; Poppy</p>
            <p class="mt-4 text-[10px] tracking-[0.2em] text-[#a38a79]">14 · 11 · 2026</p>
          </div>
        </article>

        <p class="mt-8 text-xs italic leading-6 text-[#a18c7e]">
          A little letter, with a lot of love.
        </p>
      </div>
    </section>

    <!-- STORY SECTION (CAROUSEL ASLI + ASET PINGGIRAN) -->
    <section
      id="story"
      class="story-section scroll-reveal relative overflow-hidden bg-[#f2ede4] px-5 py-16 sm:px-8"
    >
      <!-- Aset Akar / Dedaunan Hiasan Pinggir Story Section -->
      <img
        src="/images/botanical-corner.svg"
        alt=""
        aria-hidden="true"
        class="story-sprig story-sprig--tl"
      />
      <img
        src="/images/leaf-sprig.svg"
        alt=""
        aria-hidden="true"
        class="story-sprig story-sprig--bl"
      />
      <img
        src="/images/botanical-corner.svg"
        alt=""
        aria-hidden="true"
        class="story-sprig story-sprig--tr"
      />
      <img
        src="/images/leaf-sprig.svg"
        alt=""
        aria-hidden="true"
        class="story-sprig story-sprig--br"
      />

      <div class="relative z-10 mx-auto max-w-xl text-center">
        <p class="eyebrow">Chapters of us</p>
        <h2 class="mt-3 font-serif text-4xl italic">Our Love Story</h2>
        <p class="mt-3 text-xs leading-6 text-[#928075]">
          Five little chapters, one beautiful journey.
        </p>

        <!-- Carousel persis seperti struktur awal -->
        <div class="relative mt-9" @touchstart="startTouch" @touchend="endTouch">
          <div class="relative mx-auto flex h-[370px] items-center justify-center">
            <div
              v-for="(story, index) in stories"
              :key="story.title"
              class="story-card absolute w-[67%] max-w-[270px] transition-all duration-500 ease-out"
              :class="{
                'z-20 scale-100 opacity-100': index === activeStory,
                'z-10 -translate-x-[72%] scale-90 opacity-45':
                  index === (activeStory + stories.length - 1) % stories.length,
                'z-10 translate-x-[72%] scale-90 opacity-45':
                  index === (activeStory + 1) % stories.length,
                'pointer-events-none scale-75 opacity-0':
                  index !== activeStory &&
                  index !== (activeStory + 1) % stories.length &&
                  index !== (activeStory + stories.length - 1) % stories.length,
              }"
            >
              <div
                class="relative aspect-[3/4] overflow-hidden rounded-t-[48%] border-[5px] border-white bg-gradient-to-br shadow-xl shadow-[#786658]/10"
                :class="story.tone"
              >
                <img
                  :src="story.image"
                  :alt="story.title"
                  loading="lazy"
                  draggable="false"
                  class="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div v-if="index === activeStory" class="mt-5 text-center">
                <h3 class="font-serif text-2xl italic">{{ story.title }}</h3>
                <p class="mt-2 text-xs leading-6 text-[#928075]">{{ story.subtitle }}</p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center gap-8">
            <button
              type="button"
              aria-label="Previous story"
              class="carousel-arrow"
              @click="changeStory(-1)"
            >
              ←
            </button>
            <span class="text-[10px] tracking-[0.25em] text-[#917b6d]">
              {{ String(activeStory + 1).padStart(2, '0') }} /
              {{ String(stories.length).padStart(2, '0') }}
            </span>
            <button
              type="button"
              aria-label="Next story"
              class="carousel-arrow"
              @click="changeStory(1)"
            >
              →
            </button>
          </div>

          <div class="mt-5 flex justify-center gap-2">
            <button
              v-for="(story, index) in stories"
              :key="story.title"
              type="button"
              :aria-label="`Show ${story.title}`"
              :aria-current="index === activeStory ? 'true' : undefined"
              class="h-1.5 rounded-full transition-all"
              :class="index === activeStory ? 'w-7 bg-[#987866]' : 'w-1.5 bg-[#cdbbad]'"
              @click="activeStory = index"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- COUPLE SECTION -->
    <section id="couple" class="scroll-reveal relative overflow-hidden px-6 py-16 text-center">
      <img
        src="/images/botanical-corner.svg"
        alt=""
        aria-hidden="true"
        class="section-sprig section-sprig--right"
      />
      <div class="relative z-10 max-w-3xl mx-auto">
        <p class="eyebrow">Two hearts, one promise</p>
        <h2 class="mt-4 font-serif text-4xl italic">The Couple</h2>
        <div class="mx-auto mt-8 grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <article class="couple-card couple-card--poppy">
            <div class="couple-initial">P</div>
            <h3 class="mt-5 font-serif text-3xl italic">Poppy</h3>
            <p>[nama lengkap Poppy]</p>
            <p class="mt-3 text-xs leading-6 text-[#837166]">
              Putri dari Bapak [Nama Ayah] &amp; Ibu [Nama Ibu]
            </p>
          </article>
          <p class="font-serif text-3xl italic text-[#b18c78]">&amp;</p>
          <article class="couple-card couple-card--fachri">
            <div class="couple-initial">F</div>
            <h3 class="mt-5 font-serif text-3xl italic">Fachri</h3>
            <p>[nama lengkap Fachri]</p>
            <p class="mt-3 text-xs leading-6 text-[#837166]">
              Putra dari Bapak [Nama Ayah] &amp; Ibu [Nama Ibu]
            </p>
          </article>
        </div>
        <p class="mx-auto mt-9 max-w-sm text-sm italic leading-7 text-[#8d796d]">
          “And above all these put on love, which binds everything together in perfect harmony.”
        </p>
      </div>
    </section>

    <!-- EVENT SECTION -->
    <section id="event" class="scroll-reveal relative overflow-hidden bg-[#e8ece3] px-6 py-16">
      <img
        src="/images/leaf-sprig.svg"
        alt=""
        aria-hidden="true"
        class="section-sprig section-sprig--left section-sprig--muted"
      />
      <div class="relative z-10 mx-auto max-w-lg text-center">
        <p class="eyebrow eyebrow--sage">Save the date</p>
        <h2 class="mt-4 font-serif text-4xl italic">The Wedding Day</h2>
        <p class="mt-4 text-sm leading-7 text-[#788071]">
          With gratitude and joy, we invite you to witness the beginning of our forever.
        </p>
        <div class="event-card mt-9 border-y border-[#c6d0c0] py-7">
          <p class="text-[10px] uppercase tracking-[0.3em] text-[#7f8b78]">Akad Nikah</p>
          <p class="mt-4 font-serif text-2xl">Saturday</p>
          <p class="mt-1 font-serif text-5xl">14</p>
          <p class="mt-1 text-xs uppercase tracking-[0.25em]">November 2026</p>
          <p class="mt-5 text-sm">08.00 WIB – selesai</p>
          <div class="mx-auto my-6 h-px w-12 bg-[#aab6a2]" />
          <h3 class="font-serif text-xl">Masjid Raya Al-Mi'raj</h3>
          <p class="mx-auto mt-3 max-w-xs text-xs leading-6 text-[#788071]">
            Jl. Raya Pajajaran No. 10, RT 2/RW 6, Baranangsiang, Bogor, Jawa Barat, 16143
          </p>
          <a
            href="https://share.google/qAPYeR3UJZYJoHeXA"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex rounded-full border border-[#9da994] px-5 py-3 text-xs hover:bg-white/50"
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
          <div v-for="unit in countdown" :key="unit.label" class="countdown-cell">
            <p class="font-serif text-2xl tabular-nums">
              {{ String(unit.value).padStart(2, '0') }}
            </p>
            <p class="mt-1 text-[9px] uppercase tracking-wide text-[#7f8b78]">{{ unit.label }}</p>
          </div>
        </div>
        <div
          v-if="props.guest.dressCode?.enabled"
          class="mt-8 rounded-xl border border-[#c6d0c0] bg-white/35 px-5 py-5"
        >
          <p class="text-[10px] uppercase tracking-[0.3em] text-[#7f8b78]">Dress Code</p>
          <p class="mt-3 font-serif text-2xl italic">
            {{ props.guest.dressCode.label || 'Berkain' }}
          </p>
        </div>
      </div>
    </section>

    <!-- RSVP SECTION -->
    <section id="rsvp" class="scroll-reveal relative overflow-hidden px-6 py-16">
      <img
        src="/images/botanical-corner.svg"
        alt=""
        aria-hidden="true"
        class="section-sprig section-sprig--right section-sprig--small"
      />
      <div class="relative z-10 mx-auto max-w-md text-center">
        <p class="eyebrow">Kindly respond</p>
        <h2 class="mt-4 font-serif text-4xl italic">RSVP</h2>
        <p class="mt-4 text-sm leading-7 text-[#89766b]">
          Your presence would be a gift to us. Please let us know if you can join.
        </p>
        <form
          v-if="!submitted"
          class="mt-8 space-y-4 text-left"
          @submit.prevent="submitPreviewRsvp"
        >
          <label class="form-label">
            Attendance
            <select v-model="attendance" required class="form-control">
              <option value="" disabled>Please choose</option>
              <option value="attending">Joyfully accepts</option>
              <option value="not_attending">Regretfully declines</option>
            </select>
          </label>
          <label class="form-label">
            A message for the couple
            <textarea
              v-model="message"
              maxlength="1000"
              rows="4"
              placeholder="Write your wishes here..."
              class="form-control resize-y"
            />
          </label>
          <button
            type="submit"
            class="w-full rounded-full bg-[#72594c] px-6 py-4 text-sm tracking-wide text-white hover:bg-[#5f483d]"
          >
            Submit RSVP
          </button>
        </form>
        <div v-else class="mt-8 rounded-2xl border border-[#e3d7ca] bg-white/70 p-6">
          <p class="font-serif text-2xl italic">Thank you ♡</p>
          <p class="mt-3 text-sm leading-6 text-[#89766b]">
            This is a design preview. Your response has not been sent or saved yet.
          </p>
          <button
            type="button"
            class="mt-4 text-xs underline underline-offset-4"
            @click="submitted = false"
          >
            Edit preview response
          </button>
        </div>
      </div>
    </section>

    <!-- GIFT SECTION -->
    <section
      v-if="props.guest.type !== 'family'"
      id="gift"
      class="scroll-reveal relative overflow-hidden bg-[#f2ede4] px-6 py-16 text-center"
    >
      <img
        src="/images/leaf-sprig.svg"
        alt=""
        aria-hidden="true"
        class="section-sprig section-sprig--left"
      />
      <div class="relative z-10 mx-auto max-w-md">
        <p class="eyebrow">A little kindness</p>
        <h2 class="mt-4 font-serif text-4xl italic">Wedding Gift</h2>
        <p class="mt-4 text-sm leading-7 text-[#89766b]">
          Your prayers and presence are the most meaningful gifts. If you wish to share something
          more, you may use the details below.
        </p>
        <div class="gift-card mt-8">
          <p class="text-xs text-[#948175]">Bank</p>
          <p class="mt-1 font-serif text-xl">BCA</p>
          <div class="mx-auto my-5 h-px w-12 bg-[#d3bcaa]" />
          <p class="text-xs text-[#948175]">Account Number</p>
          <p class="mt-2 break-words font-serif text-2xl tracking-wider">norek norek norek</p>
          <p class="mt-5 text-xs text-[#948175]">Account Holder</p>
          <p class="mt-1 font-serif text-lg">nama pemilik rekening</p>
        </div>
        <div class="gift-card mt-5 bg-white/50">
          <p class="eyebrow">Physical Gift</p>
          <p class="mt-4 font-serif text-lg">Recipient / Address</p>
          <p class="mt-2 text-xs leading-6 text-[#89766b]">
            Gift recipient and delivery address will be added after confirmation.
          </p>
        </div>
      </div>
    </section>

    <!-- FOOTER / CLOSING -->
    <footer
      id="closing"
      class="closing-section scroll-reveal relative overflow-hidden px-6 py-20 text-center"
    >
      <img src="/images/botanical-corner.svg" alt="" aria-hidden="true" class="closing-botanical" />
      <div class="closing-wash pointer-events-none absolute inset-0" />
      <div class="relative z-10 mx-auto max-w-md">
        <img
          src="/images/leaf-sprig.svg"
          alt=""
          aria-hidden="true"
          class="mx-auto mb-5 h-12 w-20 object-contain opacity-70"
        />
        <p class="eyebrow">Until we meet</p>
        <h2 class="mt-5 font-serif text-4xl italic">With love, always.</h2>
        <p class="mt-5 text-sm leading-7 text-[#89766b]">
          Thank you for being part of our story. We look forward to sharing this special day with
          you.
        </p>
        <div class="mx-auto my-8 h-px w-16 bg-[#d3bcaa]" />
        <p class="font-serif text-2xl italic">Fachri &amp; Poppy</p>
        <p class="mt-3 text-xs tracking-[0.2em] text-[#a38a79]">14 · 11 · 2026</p>
        <p class="mt-12 text-[10px] tracking-wide text-[#9c897b]">Crafted with love by</p>
        <p class="mt-2 font-serif text-lg italic">Gamar × Eka</p>
        <div class="mt-4 flex justify-center gap-5 text-xs text-[#89766b]">
          <a
            href="https://instagram.com/gamar.youngman"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-4"
          >
            Gamar on Instagram
          </a>
          <a
            href="https://instagram.com/nrls.ka"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-4"
          >
            Eka on Instagram
          </a>
        </div>
      </div>
    </footer>

    <!-- NAVIGATION BAR -->
    <nav
      aria-label="Main navigation"
      class="fixed bottom-3 left-1/2 z-40 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-white/80 bg-[#fbf8f2]/90 p-1.5 shadow-lg shadow-[#5e4d40]/10 backdrop-blur-lg"
    >
      <a href="#home" class="nav-link">Home</a>
      <a href="#invitation-letter" class="nav-link hidden sm:block">Letter</a>
      <a href="#story" class="nav-link">Story</a>
      <a href="#event" class="nav-link">Event</a>
      <a href="#rsvp" class="nav-link nav-link--active">RSVP</a>
    </nav>
  </main>
</template>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translate3d(0, 34px, 0);
  transition:
    opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.hero-wash {
  background:
    radial-gradient(ellipse at 18% 10%, rgb(241 223 213 / 90%), transparent 52%),
    radial-gradient(ellipse at 85% 85%, rgb(225 232 220 / 90%), transparent 48%),
    linear-gradient(180deg, #fbf8f2, #f7f1e8);
}

/* Hero Root Corner Frame CSS */
.root-corner {
  position: absolute;
  width: 58px;
  height: 58px;
  opacity: 0.65;
  pointer-events: none;
}
.root-corner--tl {
  top: -12px;
  left: -12px;
  transform: rotate(0deg);
}
.root-corner--tr {
  top: -12px;
  right: -12px;
  transform: rotate(90deg);
}
.root-corner--bl {
  bottom: -12px;
  left: -12px;
  transform: rotate(270deg);
}
.root-corner--br {
  bottom: -12px;
  right: -12px;
  transform: rotate(180deg);
}

.hero-sprig {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  width: clamp(130px, 18vw, 160px); /* Sedikit lebih besar untuk impact utama */
  opacity: 0.5;
}
.hero-sprig--tl {
  top: -25px;
  left: -25px;
}
.hero-sprig--bl {
  bottom: -20px;
  left: -30px;
  transform: rotate(-20deg);
}
.hero-sprig--tr {
  top: -25px;
  right: -25px;
  transform: rotate(90deg);
}
.hero-sprig--br {
  bottom: -20px;
  right: -30px;
  transform: rotate(160deg);
}

/* CSS untuk Gradasi Pudar Tekstur Latar Belakang */
.fade-gradient-bg {
  /* Menggunakan mask untuk memudarkan tekstur gambar hero-bg.jpg di bagian atas */
  -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 80%);
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 80%);
}

.letter-section {
  isolation: isolate;
  background:
    radial-gradient(ellipse at 5% 20%, rgb(224 214 195 / 42%), transparent 35%),
    radial-gradient(ellipse at 95% 80%, rgb(218 226 211 / 52%), transparent 38%), #fbf8f2;
}
.eyebrow {
  color: #a38a79;
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
}
.eyebrow--sage {
  color: #7d8978;
}
.botanical,
.letter-sprig,
.section-sprig,
.closing-botanical {
  position: absolute;
  z-index: 0;
  width: clamp(145px, 31vw, 285px);
  height: auto;
  opacity: 0.52;
  pointer-events: none;
  user-select: none;
}
.letter-sprig--left {
  left: -42px;
  top: 13%;
  transform: rotate(-30deg);
  opacity: 0.38;
}
.letter-sprig--right {
  right: -45px;
  bottom: 4%;
  transform: rotate(155deg);
  opacity: 0.32;
}
.section-sprig--left {
  left: -50px;
  bottom: 0;
  transform: rotate(-20deg);
}
.section-sprig--right {
  right: -52px;
  top: 0;
  transform: rotate(155deg);
}
.section-sprig--muted {
  opacity: 0.25;
}
.section-sprig--small {
  width: clamp(100px, 20vw, 180px);
  opacity: 0.32;
}

/* Ornamen Hiasan Pinggir Story Section */
.story-sprig {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}
.story-sprig--tl {
  top: -20px;
  left: -20px;
  width: 130px;
  opacity: 0.45;
}
.story-sprig--bl {
  bottom: -15px;
  left: -25px;
  width: 120px;
  opacity: 0.35;
  transform: rotate(-20deg);
}
.story-sprig--tr {
  top: -20px;
  right: -20px;
  width: 130px;
  opacity: 0.45;
  transform: rotate(90deg);
}
.story-sprig--br {
  bottom: -15px;
  right: -25px;
  width: 120px;
  opacity: 0.35;
  transform: rotate(160deg);
}

.closing-botanical {
  right: -58px;
  bottom: -35px;
  transform: rotate(150deg);
  opacity: 0.3;
}
.soil-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 35px;
  background: url('/images/soil-texture.svg') center bottom/100% 100% no-repeat;
  opacity: 0.58;
  pointer-events: none;
}

.story-card {
  transform-origin: center center;
  backface-visibility: hidden;
}
.carousel-arrow {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid #cdb9a8;
  border-radius: 9999px;
  transition: background-color 300ms;
}
.carousel-arrow:hover {
  background: white;
}
.couple-card {
  padding: 40px 24px 28px;
  border: 1px solid #e9ddd0;
  border-radius: 48% 48% 18px 18px / 28% 28% 18px 18px;
}
.couple-card--poppy {
  background: linear-gradient(180deg, #f0dcd5, #f8f1e8);
}
.couple-card--fachri {
  background: linear-gradient(180deg, #dfe8df, #f6e9de);
}
.couple-initial {
  display: flex;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  margin: auto;
  border: 1px solid rgb(255 255 255 / 80%);
  border-radius: 50%;
  background: rgb(255 255 255 / 35%);
  font-family: Georgia, serif;
  font-size: 24px;
  font-style: italic;
}
.countdown-cell {
  border: 1px solid rgb(255 255 255 / 80%);
  border-radius: 12px;
  background: rgb(255 255 255 / 50%);
  padding: 16px 4px;
}
.form-label {
  display: block;
  color: #766459;
  font-size: 12px;
}
.form-control {
  display: block;
  width: 100%;
  margin-top: 8px;
  border: 1px solid #e3d7ca;
  border-radius: 12px;
  background: white;
  padding: 16px;
  font-size: 14px;
  outline: none;
  transition: border-color 250ms;
}
.form-control:focus {
  border-color: #aa8b77;
}
.gift-card {
  border: 1px solid #e0d2c4;
  border-radius: 16px;
  background: #fbf8f2;
  padding: 24px;
}
.closing-wash {
  background: radial-gradient(ellipse at bottom, #eadfd5, transparent 65%);
}
.nav-link {
  border-radius: 9999px;
  padding: 8px 12px;
  font-size: 10px;
  transition: background-color 250ms;
}
.nav-link:hover {
  background: #e8ece3;
}
.nav-link--active {
  background: #72594c;
  color: white;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .story-card,
  .carousel-arrow {
    transition: none;
  }
}

.botanical-crest {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 88%;
  height: auto;
  pointer-events: none;
  z-index: 5;
}
.botanical-crest--top {
  top: 8px;
}
.botanical-crest--bottom {
  bottom: 8px;
}

/* Penyesuaian Ukuran Akar Sudut agar lebih rapat & rapat merambat */
.root-corner {
  position: absolute;
  width: 68px;
  height: 68px;
  opacity: 0.75;
  pointer-events: none;
  z-index: 4;
}
.root-corner--tl {
  top: -10px;
  left: -10px;
}
.root-corner--tr {
  top: -10px;
  right: -10px;
  transform: rotate(90deg);
}
.root-corner--bl {
  bottom: -10px;
  left: -10px;
  transform: rotate(270deg);
}
.root-corner--br {
  bottom: -10px;
  right: -10px;
  transform: rotate(180deg);
}
</style>
