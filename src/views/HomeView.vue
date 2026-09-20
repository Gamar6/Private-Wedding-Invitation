<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const namaTamu = ref('')

onMounted(() => {
  const storedName = localStorage.getItem('namaUndangan')
  if (!storedName) {
    // Jika belum login passkey, tendang kembali ke halaman awal
    router.push('/')
  } else {
    namaTamu.value = storedName
  }
})
</script>

<template>
  <div class="main-container">
    <!-- Menyapa nama tamu secara dinamis -->
    <h1 class="welcome-text">Selamat Datang, {{ namaTamu }}!</h1>
    <p class="sub-text">Silakan geser, perbesar, atau putar gambar di bawah untuk menjelajah.</p>
    
    <!-- Kontainer Mental Canvas Web Player -->
    <div class="canvas-wrapper">
      <iframe 
        src="https://www.mentalcanvas.net/pkcf3phrbsc" 
        title="Undangan Mental Canvas" 
        width="100%" 
        height="600" 
        allowfullscreen
        style="border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
.welcome-text {
  font-family: 'Georgia', serif;
  color: #2c3e50;
  margin-bottom: 5px;
}
.sub-text {
  color: #7f8c8d;
  margin-bottom: 25px;
}
.canvas-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
</style>
