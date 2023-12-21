<template>
  <div class="vertical-menu">
    <div data-simplebar class="h-100">
      <div id="sidebar-menu">
        <ul class="metismenu list-unstyled" id="side-menu">
          <li class="text-center mt-2" id="thumbnail">
           <img :src="session.getUser.thumbnail" alt="thumbnail" class="img-thumbnail rounded-circle avatar-xl" width="90">
           <h5 class="mt-3 mb-1 text-white">{{ session.getUser.name }}</h5>
           <p class="text-white font-size-14">{{ session.getUser.role }}</p>
           <hr class="text-white">
          </li>
          <li :class="$route.path === '/' ? 'mm-active' : ''">
            <RouterLink to="/">
              <i data-feather="home"></i>
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li :class="$route.path.includes('/data-siswa') ? 'mm-active' : ''">
            <RouterLink to="/data-siswa">
              <i data-feather="users"></i>
              <span>Data Siswa</span>
            </RouterLink>
          </li>
          <li :class="$route.path.includes('/transaksi') ? 'mm-active' : ''">
            <a href="javascript: void(0);" class="has-arrow waves-effect" aria-expanded="false">
              <i data-feather="file"></i>
              <span>Transaksi</span>
            </a>
            <ul class="sub-menu mm-collapse">
              <li :class="$route.path.includes('/transaksi/setoran') ? 'mm-active' : ''">
              <RouterLink to="/transaksi/setoran">Setoran</RouterLink></li>
              <li :class="$route.path.includes('/transaksi/penarikan') ? 'mm-active' : ''">
                <RouterLink to="/transaksi/penarikan">Penarikan</RouterLink></li>
            </ul>
          </li>
          <li :class="$route.path.includes('/laporan') ? 'mm-active' : ''">
            <RouterLink to="/laporan">
              <i data-feather="file-text"></i>
              <span>Laporan</span>
            </RouterLink>
          </li>
          <li :class="$route.path.includes('/manajemen-tahun-ajar') ? 'mm-active' : ''">
            <RouterLink to="/manajemen-tahun-ajar">
              <i data-feather="database"></i>
              <span>Manajemen Tahun Ajar</span>
            </RouterLink>
          </li>
          <li :class="$route.path.includes('/pengaturan') ? 'mm-active' : ''">
            <a href="javascript: void(0);" class="has-arrow waves-effect" aria-expanded="false">
              <i data-feather="settings"></i>
              <span>Pengaturan</span>
            </a>
            <ul class="sub-menu mm-collapse">
              <li :class="$route.path.includes('/pengaturan/kelas') ? 'mm-active' : ''">
              <RouterLink to="/pengaturan/kelas">Kelas</RouterLink></li>
              <li :class="$route.path.includes('/pengaturan/operator') ? 'mm-active' : ''">
                <RouterLink to="/pengaturan/operator">Operator</RouterLink></li>
              <li :class="$route.path.includes('/pengaturan/profile') ? 'mm-active' : ''">
              <RouterLink to="/pengaturan/profile">Profile</RouterLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
declare const $: any;
declare const feather: any;
</script>


<script setup lang="ts">
import { onMounted } from "vue";
import { useSessionStore } from "../stores/session";
const session = useSessionStore();
onMounted(() => {
  feather.replace();
  $("#side-menu").metisMenu({
    activeClass: "mm-active",
  });
});
</script>

<style scoped>
.avatar-xl {
  height: 10em;
  width: 10em;
}


</style>