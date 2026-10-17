<script setup lang="ts">
import { ref, computed } from 'vue'
import { createClient } from '@supabase/supabase-js'

// Inisialisasi Supabase Client secara langsung agar tidak perlu meraba-raba path file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 1. Interface TypeScript
interface Guest {
  name: string
  type: string
}

interface RsvpItem {
  id: string
  attendance: string
  message: string | null
  created_at: string
  guests: Guest | null
}

// 2. Reactive State
const rsvpList = ref<RsvpItem[]>([])
const loading = ref(false)
const adminPasscode = ref('')
const isAuthenticated = ref(false)
const errorMessage = ref('')

// Proteksi Passcode Admin
const handleLogin = () => {
  if (adminPasscode.value === 'adminwedding123') {
    isAuthenticated.value = true
    fetchRsvpData()
  } else {
    alert('Passcode admin salah!')
  }
}

// Fetch Data dari Supabase
const fetchRsvpData = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const { data, error } = await supabase
      .from('rsvps')
      .select(`
        id,
        attendance,
        message,
        created_at,
        guests (
          name,
          type
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    rsvpList.value = (data as unknown as RsvpItem[]) || []
  } catch (err) {
    const errorObj = err as Error
    console.error('Error fetching RSVPs:', errorObj.message || err)
    errorMessage.value = 'Gagal memuat data rekap kehadiran.'
  } finally {
    loading.value = false
  }
}

// Hitung Jumlah Hadir
const totalHadir = computed(() => {
  return rsvpList.value.filter((item) => {
    const att = item.attendance?.toLowerCase() || ''
    return att.includes('hadir') && !att.includes('tidak')
  }).length
})
</script>

<template>
  <div class="min-h-screen bg-stone-50 p-4 md:p-8 font-sans">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
      <header class="mb-6 border-b border-stone-100 pb-4">
        <h1 class="text-2xl font-serif text-stone-800">Rekapitulasi Kehadiran & Ucapan (RSVP)</h1>
        <p class="text-sm text-stone-500 mt-1">Halaman khusus pengantin / client</p>
      </header>

      <!-- Form Login Admin -->
      <div v-if="!isAuthenticated" class="max-w-sm mx-auto py-12 space-y-4">
        <div class="text-center mb-6">
          <p class="text-stone-700 font-medium">Masukkan Passcode Admin</p>
          <p class="text-xs text-stone-400 mt-1">Untuk melihat data tamu yang sudah konfirmasi.</p>
        </div>
        <input
          type="password"
          v-model="adminPasscode"
          placeholder="Masukkan passcode..."
          @keyup.enter="handleLogin"
          class="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-600 text-sm"
        />
        <button
          @click="handleLogin"
          class="w-full bg-stone-800 text-white py-2.5 rounded-xl hover:bg-stone-700 transition font-medium text-sm"
        >
          Masuk ke Dashboard
        </button>
      </div>

      <!-- Dashboard Data -->
      <div v-else>
        <!-- Ringkasan Statistik -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
            <p class="text-xs text-emerald-600 uppercase font-semibold tracking-wider">
              Konfirmasi Hadir
            </p>
            <p class="text-3xl font-bold text-emerald-800 mt-1">{{ totalHadir }}</p>
          </div>
          <div class="bg-stone-50 border border-stone-200 p-4 rounded-xl">
            <p class="text-xs text-stone-600 uppercase font-semibold tracking-wider">
              Total Respon Masuk
            </p>
            <p class="text-3xl font-bold text-stone-800 mt-1">{{ rsvpList.length }}</p>
          </div>
        </div>

        <!-- Tombol Refresh & Status -->
        <div class="flex justify-between items-center mb-4">
          <button
            @click="fetchRsvpData"
            class="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-lg transition"
          >
            🔄 Refresh Data
          </button>
          <span v-if="loading" class="text-xs text-stone-400">Memuat data terbaru...</span>
        </div>

        <div v-if="errorMessage" class="p-4 bg-rose-50 text-rose-700 text-sm rounded-xl mb-4">
          {{ errorMessage }}
        </div>

        <!-- Tabel Rekap Tamu -->
        <div class="overflow-x-auto border border-stone-200 rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="bg-stone-100 text-stone-600 text-xs uppercase tracking-wider border-b border-stone-200"
              >
                <th class="p-3.5">Nama Tamu</th>
                <th class="p-3.5">Status Kehadiran</th>
                <th class="p-3.5">Pesan / Doa</th>
                <th class="p-3.5">Waktu Mengisi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100 text-sm text-stone-700">
              <tr v-if="rsvpList.length === 0 && !loading">
                <td colspan="4" class="text-center py-8 text-stone-400">
                  Belum ada data RSVP yang masuk.
                </td>
              </tr>
              <tr v-for="item in rsvpList" :key="item.id" class="hover:bg-stone-50/60 transition">
                <td class="p-3.5 font-medium text-stone-900">
                  {{ item.guests?.name || 'Tamu Undangan' }}
                  <span class="block text-xs text-stone-400 capitalize"
                    >Tipe: {{ item.guests?.type || 'umum' }}</span
                  >
                </td>
                <td class="p-3.5">
                  <span
                    :class="
                      item.attendance?.toLowerCase().includes('hadir') &&
                      !item.attendance?.toLowerCase().includes('tidak')
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    "
                    class="px-2.5 py-1 rounded-full text-xs font-medium capitalize inline-block"
                  >
                    {{ item.attendance }}
                  </span>
                </td>
                <td class="p-3.5 max-w-xs text-stone-600 italic">
                  "{{ item.message || 'Tidak ada pesan' }}"
                </td>
                <td class="p-3.5 text-xs text-stone-400 whitespace-nowrap">
                  {{
                    new Date(item.created_at).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
