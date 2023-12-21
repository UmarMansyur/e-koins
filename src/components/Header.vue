<template>
  <div class="modal fade" id="qrCodeModal" role="dialog" aria-labelledby="qrCodeModalLabel">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <div id="qrCode-scanner"></div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-secondary mt-3" @click="closeCamera" data-bs-dismiss="modal" id="btn-close-camera">
              <i class="mdi mdi-camera-off"></i> Tutup Kamera
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box" id="navbar-brand-header">
          <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
              <img src="/images/logo.svg" alt="" height="24">
            </span>
            <span class="logo-lg text-center">
              <img src="/images/logo.svg" alt="" height="24"> <span class="logo-txt">E-Koin</span>
            </span>
          </a>
        </div>

        <button type="button" class="btn btn-sm px-3 font-size-16 header-item" id="vertical-menu-btn"
          @click="clickedSidebar()">
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <!-- <div class="dropdown d-inline-block">
          <button type="button" class="btn header-item noti-icon position-relative"
            id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i data-feather="bell"></i>
            <span class="badge bg-danger rounded-pill" v-if="unreadNotification > 0">{{ unreadNotification }}</span>
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
            aria-labelledby="page-header-notifications-dropdown">
            <div class="p-3">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="m-0"> Notifikasi </h6>
                </div>
                <div class="col-auto">
                  <a href="#!" class="small text-reset text-decoration-underline"> Tidak dibaca ({{ unreadNotification
                  }})</a>
                </div>
              </div>
            </div>
            <div data-simplebar="init">
              <div class="simplebar-wrapper">
                <div class="simplebar-height-auto-observer-wrapper">
                  <div class="simplebar-height-auto-observer"></div>
                </div>
                <div class="simplebar-mask">
                  <div class="simplebar-offset">
                    <div class="simplebar-content-wrapper">
                      <div class="simplebar-content" data-simplebar style="max-height: 230px;">
                        <div class="text-reset notification-item">
                          <div class="d-flex" v-for="data in notifications" :key="data.notification_id"
                            :class="data.status == 'unread' ? 'bg-body-tertiary' : ''" style="cursor: pointer"
                            @click="readNotification(data.notification_id)">
                            <div class="flex-shrink-0 me-3">
                              <img :src="getUser.thumbnail" class="rounded-circle avatar-sm" alt="user-pic">
                            </div>
                            <div class="flex-grow-1">
                              <h6 class="mb-1">{{ getUser.name }}</h6>
                              <div class="font-size-13 text-muted">
                                <p class="mb-1">{{ data.message }}</p>
                                <p class="mb-0"><i class="mdi mdi-clock-outline"></i>
                                  <span>
                                    {{ data.created_at }}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="simplebar-placeholder"></div>
              </div>
              <div class="simplebar-track simplebar-horizontal">
                <div class="simplebar-scrollbar"></div>
              </div>
              <div class="simplebar-track simplebar-vertical">
                <div class="simplebar-scrollbar"></div>
              </div>
            </div>
            <div class="p-2 border-top d-grid">
              <a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                <i class="mdi mdi-arrow-right-circle me-1"></i> <span>
                  Lihat semua
                </span>
              </a>
            </div>
          </div>
        </div> -->
        <div class="dropdown d-inline-block bg-info text-white border-start">
          <button type="button" class="btn header-item" id="page-header-user-dropdown" data-bs-toggle="modal"
            data-bs-target="#qrCodeModal" @click="openCamera">
            <i class="mdi mdi-qrcode-scan font-size-24"></i>
          </button>

        </div>
        <div class="dropdown d-inline-block">
          <button type="button" class="btn header-item border-end border-start" id="page-header-user-dropdown">
            <img class="rounded-circle header-profile-user" :src="session.getUser.thumbnail" alt="Header Avatar">
            <span class="d-none d-xl-inline-block ms-1 fw-medium">{{ session.getUser.name }}</span>
          </button>
        </div>
        <div class="dropdown d-inline-block bg-white border-end">
          <button type="button" class="btn header-item" id="page-header-user-dropdown" @click="logout">
            <i data-feather="power"></i>
          </button>
        </div>

      </div>
    </div>
  </header>
</template>

<script lang="ts">
declare const feather: any;
declare const Html5Qrcode: any;
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSessionStore } from '../stores/session';
import { useStudentStore } from '../stores/student';
import router from '../router';
import useApi from '../composables/api';
import Notify from '../helpers/notify';
import { isDisableLayer } from '../helpers/handleEvent';
const session = useSessionStore();

function clickedSidebar() {
  document.body.classList.toggle("pace-done");
  document.body.classList.toggle("sidebar-enable");
  if (document.body.getAttribute('data-sidebar-size') == 'lg') {
    document.body.setAttribute("data-sidebar-size", "sm");
  } else {
    document.body.setAttribute('data-sidebar-size', 'lg');
  }
  if (window.innerWidth < 922) {
    document.body.setAttribute('data-sidebar-size', 'lg');
    document.body.classList.remove("pace-done");
  } else {
    document.getElementById('thumbnail')?.classList.toggle('d-none');
  }
}

async function logout() {
  router.replace('/login');
  session.destroyUser();
  localStorage.removeItem('token');
}

// const { getPusher } = sessionPusher();
onMounted(async () => {
  //   isEnableLayer();
  document.body.setAttribute('data-sidebar-size', 'lg');
  if (window.innerWidth <= 992) {
    clickedSidebar();
  }
  //   await loadNotification();
  //   subscribeNotification();
});

const html5QrCode = ref<any>(null);
onMounted(() => {
  html5QrCode.value = new Html5Qrcode(/* element id */ "qrCode-scanner");
});
const openCamera = () => {

  const config = {
    fps: 10,
    qrbox: 250,
    aspectRatio: 1,
  };
  // html5QrcodeScanner.start({ facingMode: "environment" });
  html5QrCode.value.start({ facingMode: "environment" }, config, onScanSuccess);
};

const { postResource } = useApi();
const studentStore = useStudentStore();
const onScanSuccess = async (decodedText: any, decodedResult: any) => {
  const data = JSON.parse(decodedText);
  const response = await postResource('/transaction/scan/qr-code', data);
  isDisableLayer();
  if(response) {
    studentStore.id = response.data.id;
    studentStore.name = response.data.studentClass.student.name;
    studentStore.class = response.data.studentClass.class.name;
    studentStore.studentId = response.data.studentClassId;
    studentStore.saldo = response.data.saldo;
    studentStore.thumbnail = response.data.studentClass.student.thumbnail;
    Notify.success('Data siswa berhasil di scan');
  }
  router.replace('/transaksi/setoran');
  document.getElementById('btn-close-camera')?.click();
  console.log(`Scan result: ${decodedText}`, decodedResult);
};

const closeCamera = () => {
  html5QrCode.value.stop();
};
</script>
