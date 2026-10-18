<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Guest } from './PasskeyView.vue'

const props = defineProps<{ guest: Guest }>()

const stories = [
  {
    title: 'Foto pertama kita',
    subtitle: 'Kita dibilang mirip wkwkwk...',
    image: '/images/Foto-pertama-kita.jpg',
    tone: 'from-[#dce6dc] to-[#f2ded3]',
  },
  {
    title: 'Kebiasaan awal pacaran',
    subtitle: 'Masih punya energi bolak-balik Bogor-Bekasi wkwk.. ',
    image: '/images/Kebiasaan-awal-pacaran-(masih-punya-energi-bolak-balik-Bogor-Bekasi-wkwk).jpg',
    tone: 'from-[#ead8d7] to-[#f6e9db]',
  },
  {
    title: 'Jaman Covid',
    subtitle: 'Makan bubur pagi-pagi di Galaxy. <i>cakeppp!!</i>',
    image: '/images/Jaman-covid-makan-bubur-pagi-pagi-di-Galaxy.jpg',
    tone: 'from-[#e7dfd0] to-[#d4e1d9]',
  },
  {
    title: 'Fachri dan Rambut Panjangnya',
    subtitle: 'Selalu nyariin kunciran di manapunnnn',
    image: '/images/Fachri-dan-rambut-panjangnya-yang-di-kuncir.jpg',
    tone: 'from-[#e9d6c9] to-[#e1e5d7]',
  },
  {
    title: 'Hunting di Taman Literasi',
    subtitle:
      'Ini taman literasi belum dibuka untuk umum ... tapi kita udah hunting duluan, wleeee!',
    image: '/images/Hunting-Taman-Literasi-Blok-M-pas-belum-di-buka-untuk-umum.jpg',
    type: 'image',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
  {
    title: 'Makan Masakan Fachri untuk Pertama Kalinya',
    subtitle: 'Perkedel dan maklor .. nyamnyam!!',
    image: '/images/Makan-masakan-Fachri-untuk-pertama-kalinya.jpg',
    type: 'image',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
  {
    title: 'Fachri jadi Narsum di KKN Poppy',
    subtitle: 'Ternyata Fachri disukai sama ibu-ibu di tempat KKN Poppy.',
    image: '/images/Fachri-jadi-narasumber-di-tempat-KKN-nya-Poppy.jpg',
    type: 'image',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
  {
    title: 'Poppy Sidang Skripsi',
    subtitle: 'Nemenin dari semester 2 sampe akhir. <i>terharu ketjil</i>',
    image: '/images/Poppy-sidang-skripsi.jpg',
    type: 'image',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
  {
    title: 'Merayakan Fachri Keterima Kerja di Gravel',
    subtitle: 'Makan all you can eat. <i>yeayyyy!</i>',
    image: '/images/Merayakan-Fachri-yang-baru-keterima-kerja-di-Gravel.jpg',
    type: 'image',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
  {
    title: 'Keliling Kampus Poppy',
    subtitle: 'ditutup dengan makan TEKWANNN!! di Kantin Kampus.',
    image: '/images/Keliling-kampus-Poppy-untuk-pertama-kalinya.jpg',
    type: 'image',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
  {
    title: 'Merayakan Ulang Tahun Fachri ke-26',
    subtitle: 'Makan bersama orang-orang yang ada di kampung pemulung, Gasong.',
    image: '/images/Merayakan-ulang-tahun-Fachri-ke-26-di-Gasong-Kampung-Pemulung❤️.jpg',
    type: 'image',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
  {
    title: 'Akhirnya ....',
    subtitle: 'Di tahun ke-6, Poppy dilamar Fachri~',
    image: '/images/Poppy-di-lamar-Fachri🥹.jpg',
    type: 'image',
    tone: 'from-[#d9e3d8] to-[#f0dcd7]',
  },
]
const activeStory = ref(0)
const currentStory = computed(() => stories[activeStory.value])
const now = ref(Date.now())
const weddingDate = new Date('2026-11-14T08:00:00+07:00').getTime()
const attendance = ref('')
const message = ref('')
const submitted = ref(false)
const activeSection = ref('home')

let carouselTimer: ReturnType<typeof setInterval> | undefined
let countdownTimer: ReturnType<typeof setInterval> | undefined
let revealObserver: IntersectionObserver | undefined
let sectionObserver: IntersectionObserver | undefined
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

// Observer untuk mendeteksi section yang sedang aktif di layar buat Navbar
function setupActiveSectionObserver() {
  const navSections = document.querySelectorAll<HTMLElement>('section[id], footer[id]')
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.3 },
  )
  navSections.forEach((sec) => sectionObserver?.observe(sec))
}

function addToCalendar() {
  const title = 'Akad Nikah - Fachri & Poppy'

  // 14 November 2026, pukul 08.00–10.00 WIB
  const start = '20261114T010000Z'
  const end = '20261114T030000Z'

  const location =
    "Masjid Raya Al-Mi'raj, Jl. Raya Pajajaran No. 10, Baranangsiang, Bogor, Jawa Barat, 16143"

  const details = 'With gratitude and joy, we invite you to witness the beginning of our forever.'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details,
    location,
  })

  window.open(
    `https://calendar.google.com/calendar/render?${params.toString()}`,
    '_blank',
    'noopener,noreferrer',
  )
}
onMounted(() => {
  carouselTimer = setInterval(() => changeStory(1), 5000)
  countdownTimer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
  setupScrollReveal()
  setupActiveSectionObserver()
})

onUnmounted(() => {
  if (carouselTimer) clearInterval(carouselTimer)
  if (countdownTimer) clearInterval(countdownTimer)
  revealObserver?.disconnect()
  sectionObserver?.disconnect()
})
</script>

<template>
  <main class="invitation-page min-h-screen overflow-hidden bg-[#fbf8f2] text-[#57483f]">
    <!-- HERO SECTION -->
    <section
      id="home"
      class="hero-section scroll-reveal relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      <div class="hero-wash pointer-events-none absolute inset-0" />

      <!-- Aset Akar/Dedaunan di Sudut Utama Section (Rame & Membumi) -->
      <img src="/images/BUNGA.svg" alt="" aria-hidden="true" class="hero-sprig hero-sprig--tl" />
      <img src="/images/8.svg" alt="" aria-hidden="true" class="hero-sprig hero-sprig--bl" />
      <img src="/images/BUNGA.svg" alt="" aria-hidden="true" class="hero-sprig hero-sprig--tr" />
      <img src="/images/8.svg" alt="" aria-hidden="true" class="hero-sprig hero-sprig--br" />

      <div class="relative z-10 mx-auto max-w-sm sm:max-w-md w-full">
        <!-- FRAME AKAR & DEDAUNAN LINGKUP NAMA -->
        <div
          class="hero-root-frame relative px-6 py-14 rounded-[44px] border border-[#c2b29f]/30 bg-white/45 backdrop-blur-[3px] shadow-sm"
        >
          <!-- Background Image dibatasi rounded-[44px] dan overflow-hidden tersendiri agar tidak bocor keluar -->
          <div
            class="absolute opacity-30 inset-0 bg-cover bg-center pointer-events-none rounded-[44px] overflow-hidden"
            style="background-image: url('/images/bg-hero.jpg')"
          />

          <img
            src="/images/cincin.png"
            alt=""
            aria-hidden="true"
            class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[25%] z-20 w-60 h-auto"
          />

          <!-- 2. BOTTOM FRAME DI BAWAH FRAME (Didorong jauh ke bawah memotong garis terluar) -->
          <img
            src="/images/bottom-frame.svg"
            alt=""
            aria-hidden="true"
            class="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[47%] z-20 w-60 h-auto"
          />

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

    <!-- INVITATION LETTER SECTION -->
    <section
      id="invitation-letter"
      class="letter-section scroll-reveal relative overflow-hidden px-5 py-20 sm:px-8"
    >
      <img src="/images/8.svg" alt="" aria-hidden="true" class="letter-sprig letter-sprig--left" />
      <img
        src="/images/BUNGA.svg"
        alt=""
        aria-hidden="true"
        class="letter-sprig letter-sprig--right"
      />

      <div class="relative z-10 mx-auto max-w-lg text-center">
        <p class="eyebrow">A letter for you</p>
        <h2 class="mt-2 font-serif text-3xl italic text-[#6f5545]">Especially for you</h2>

        <article
          class="classic-letter-card mt-8 relative rounded-2xl border border-[#d8c5b2] bg-[#fffaf3] p-8 sm:p-10 shadow-sm"
        >
          <div class="classic-letter-inner p-6 rounded-xl border border-[#e5d8cb] relative">
            <img
              src="/images/8.svg"
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

    <!-- STORY SECTION -->
    <section
      id="story"
      class="story-section scroll-reveal relative overflow-hidden bg-[#f2ede4] px-5 py-16 sm:px-8"
    >
      <!-- Floral decorations -->
      <img src="/images/BUNGA.svg" alt="" aria-hidden="true" class="story-sprig story-sprig--tl" />
      <img src="/images/8.svg" alt="" aria-hidden="true" class="story-sprig story-sprig--bl" />
      <img src="/images/BUNGA.svg" alt="" aria-hidden="true" class="story-sprig story-sprig--tr" />
      <img src="/images/8.svg" alt="" aria-hidden="true" class="story-sprig story-sprig--br" />

      <div class="relative z-10 mx-auto max-w-xl text-center">
        <!-- Section heading -->
        <p class="eyebrow">Chapters of us</p>

        <h2 class="mt-3 font-serif text-4xl italic">Our Love Story</h2>

        <p class="mx-auto mt-3 max-w-sm text-xs leading-6 text-[#928075]">
          Five little chapters, one beautiful journey.
        </p>

        <!-- Story carousel -->
        <div class="relative mt-8" @touchstart="startTouch" @touchend="endTouch">
          <!-- Image stage: fixed height, independent of text -->
          <div class="relative mx-auto flex h-[290px] items-center justify-center sm:h-[340px]">
            <div
              v-for="(story, index) in stories"
              :key="story.title"
              class="story-card absolute w-[62%] max-w-[230px] transition-all duration-500 ease-out sm:w-[67%] sm:max-w-[270px]"
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
            </div>
          </div>

          <!-- Story text: separate from the image stage -->
          <div class="mx-auto mt-5 min-h-[150px] max-w-md px-2 sm:min-h-[135px]" aria-live="polite">
            <Transition
              mode="out-in"
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="translate-y-2 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <div v-if="currentStory" :key="activeStory">
                <h3 class="font-serif text-2xl italic text-[#76594f]">
                  {{ currentStory.title }}
                </h3>

                <p
                  class="mt-3 whitespace-normal break-words text-xs leading-6 text-[#928075] sm:text-sm"
                  v-html="currentStory.subtitle"
                ></p>
              </div>
            </Transition>
          </div>

          <!-- Navigation -->
          <div class="mt-5 flex items-center justify-center gap-8">
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

          <!-- Pagination dots -->
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
        src="/images/BUNGA.svg"
        alt=""
        aria-hidden="true"
        class="section-sprig section-sprig--right"
      />

      <div class="relative z-10 mx-auto max-w-3xl">
        <p class="eyebrow">Two hearts, one promise</p>

        <h2 class="mt-4 font-serif text-4xl italic">The Couple</h2>

        <div class="mx-auto mt-8 grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <!-- Poppy -->
          <article class="couple-card couple-card--poppy">
            <div
              class="mx-auto h-56 w-44 overflow-hidden rounded-t-full border border-[#d8c1aa] bg-[#f4e8df] p-1.5 shadow-lg shadow-[#76594f]/10 sm:h-64 sm:w-48"
            >
              <img
                src="/images/poppy.jpeg"
                alt="Poppy, Septia Catur Amalia"
                class="h-full w-full rounded-t-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <h3 class="mt-5 font-serif text-3xl italic">Poppy</h3>

            <p>Septia Catur Amalia</p>

            <p class="mt-3 text-xs leading-6 text-[#837166]">
              Putri ke-4 dari Bapak Hairi Armadi &amp; Ibu Masturi
            </p>
          </article>

          <!-- Decorative separator -->
          <p class="font-serif text-3xl italic text-[#b18c78]" aria-hidden="true">&amp;</p>

          <!-- Fachri -->
          <article class="couple-card couple-card--fachri">
            <div
              class="mx-auto h-56 w-44 overflow-hidden rounded-t-full border border-[#d8c1aa] bg-[#f4e8df] p-1.5 shadow-lg shadow-[#76594f]/10 sm:h-64 sm:w-48"
            >
              <img
                src="/images/fachri.jpg"
                alt="Fachri Muflihuddin"
                class="h-full w-full rounded-t-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <h3 class="mt-5 font-serif text-3xl italic">Fachri</h3>

            <p>Fachri Muflihuddin</p>

            <p class="mt-3 text-xs leading-6 text-[#837166]">
              Putra ke-4 dari Bapak H. Encep Kamal Soma &amp; Ibu Hj. Yati Supiyati
            </p>
          </article>
        </div>

        <p class="mx-auto mt-9 max-w-sm text-sm italic leading-7 text-[#8d796d]">
          "And among His signs is that He created for you mates from among yourselves, that you may
          find tranquility in them; and He placed between you affection and mercy.”
        </p>
      </div>
    </section>

    <!-- EVENT SECTION -->
    <section id="event" class="scroll-reveal relative overflow-hidden bg-[#e8ece3] px-6 py-16">
      <img src="/images/8.svg" alt="" aria-hidden="true" class="event-sprig event-sprig--bl" />

      <img src="/images/BUNGA.svg" alt="" aria-hidden="true" class="event-sprig event-sprig--tr" />

      <img src="/images/8.svg" alt="" aria-hidden="true" class="event-sprig event-sprig--br" />
      <img
        src="/images/8.svg"
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
          <button
            type="button"
            @click="addToCalendar"
            class="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#687760] px-6 py-3 text-xs tracking-wide text-white transition hover:bg-[#53614c]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18M12 15v4M10 17h4" />
            </svg>
            Add to Calendar
          </button>
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
        src="/images/BUNGA.svg"
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
        src="/images/8.svg"
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
          <p class="mt-2 break-words font-serif text-2xl tracking-wider">0661367996</p>
          <p class="mt-5 text-xs text-[#948175]">Account Holder</p>
          <p class="mt-1 font-serif text-lg">Septia Catur Amalia</p>
        </div>
        <div class="gift-card mt-5 bg-white/50">
          <p class="eyebrow">Physical Gift</p>
          <p class="mt-4 font-serif text-lg">Recipient / Address</p>
          <div class="mx-auto my-5 h-px w-12 bg-[#d3bcaa]" />
          <p class="mt-1 text-sm leading-6 text-[#89766b]">
            Kp. Bakom Pesantren, No. 20,
            <br />
            RT 001/RW 005,
            <br />
            Kelurahan Bojongkerta, Kecamatan Bogor Selatan, Kota Bogor, 16139
          </p>
          <br />
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
      <img src="/images/BUNGA.svg" alt="" aria-hidden="true" class="closing-botanical" />
      <div class="closing-wash pointer-events-none absolute inset-0" />
      <div class="relative z-10 mx-auto max-w-md">
        <img
          src="/images/8.svg"
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

    <!-- NAVIGATION BAR (DINAMIS ACTIVE STATE) -->
    <nav
      aria-label="Main navigation"
      class="fixed bottom-3 left-1/2 z-40 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-white/80 bg-[#fbf8f2]/90 p-1.5 shadow-lg shadow-[#5e4d40]/10 backdrop-blur-lg"
    >
      <a href="#home" class="nav-link" :class="{ 'nav-link--active': activeSection === 'home' }"
        >Home</a
      >
      <a
        href="#invitation-letter"
        class="nav-link hidden sm:block"
        :class="{ 'nav-link--active': activeSection === 'invitation-letter' }"
        >Letter</a
      >
      <a href="#story" class="nav-link" :class="{ 'nav-link--active': activeSection === 'story' }"
        >Story</a
      >
      <a href="#event" class="nav-link" :class="{ 'nav-link--active': activeSection === 'event' }"
        >Event</a
      >
      <a href="#rsvp" class="nav-link" :class="{ 'nav-link--active': activeSection === 'rsvp' }"
        >RSVP</a
      >
      <a
        v-if="props.guest.type !== 'family'"
        href="#gift"
        class="nav-link hidden sm:block"
        :class="{ 'nav-link--active': activeSection === 'gift' }"
        >Gift</a
      >
      <a
        href="#closing"
        class="nav-link"
        :class="{ 'nav-link--active': activeSection === 'closing' }"
        >Closing</a
      >
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

/* Botanical ornaments — Event Section */
.event-sprig {
  position: absolute;
  z-index: 0;
  width: clamp(125px, 27vw, 230px);
  height: auto;
  pointer-events: none;
  user-select: none;
}

.event-sprig--tl {
  top: -12px;
  left: -28px;
  opacity: 0.48;
  transform: rotate(-12deg);
}

.event-sprig--tr {
  top: 8%;
  right: -35px;
  opacity: 0.38;
  transform: rotate(95deg) scale(0.9);
}

.event-sprig--bl {
  bottom: 5%;
  left: -30px;
  opacity: 0.32;
  transform: rotate(-28deg) scale(0.9);
}

.event-sprig--br {
  right: -25px;
  bottom: -10px;
  opacity: 0.42;
  transform: rotate(155deg);
}
</style>
