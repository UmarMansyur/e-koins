<template>
  <Parent>
    <BreadCrumb title="Dashboard" />
    <div class="row">
      <div class="col-xl-4 col-md-6">
        <div class="card card-h-100">
          <div class="card-body shadow">
            <div class="row align-items-center">
              <div class="col-6"><span class="text-muted mb-3 lh-1 d-block text-truncate">Jumlah Siswa</span>
                <h4 class="mb-3"><span class="counter-value">{{ datas.total_class }}</span></h4>
              </div>
              <div class="col-6 text-end">
                <div class="avatar-md float-end"><span class="avatar-title rounded-circle font-size-24 bg-danger">
                    <i data-feather="users"></i></span></div>
              </div>
            </div>
            <div class="text-nowrap">
              <span class="badge bg-success text-white">
                {{ new Date().toISOString().slice(0, 10) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-6">
        <div class="card card-h-100">
          <div class="card-body shadow">
            <div class="row align-items-center">
              <div class="col-6"><span class="text-muted mb-3 lh-1 d-block text-truncate">Total Setoran</span>
                <h4 class="mb-3"><span class="counter-value">{{ convertToRp(datas.total_income) }}</span></h4>
              </div>
              <div class="col-6 text-end">
                <div class="avatar-md float-end"><span class="avatar-title rounded-circle font-size-24 bg-success"><i
                      data-feather="dollar-sign"></i></span></div>
              </div>
            </div>
            <div class="text-nowrap">
              <span class="badge bg-success text-white">
                {{ new Date().toISOString().slice(0, 10) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-md-6">
        <div class="card card-h-100">
          <div class="card-body shadow">
            <div class="row align-items-center">
              <div class="col-6"><span class="text-muted mb-3 lh-1 d-block text-truncate">Setoran Hari Ini</span>
                <h5 class="mb-3"><span class="counter-value">{{ convertToRp(datas.income)  }}</span></h5>
              </div>
              <div class="col-6 text-end">
                <div class="avatar-md float-end"><span class="avatar-title rounded-circle font-size-24 bg-warning"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-upload-cloud">
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg></span></div>
              </div>
            </div>
            <div class="text-nowrap">
              <span class="badge bg-success text-white">
                {{ new Date().toISOString().slice(0, 10) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import BreadCrumb from "../../components/BreadCrumb.vue";
import Parent from "../../components/Parent.vue";
import useApi from "../../composables/api";
import { convertToRp, isDisableLayer } from "../../helpers/handleEvent";

const { getResource } = useApi();
onMounted( async () => {
  loadData();
});

const datas = ref<any>({});
const loadData = async () => {
  const response = await getResource('/dashboard');
  isDisableLayer();
  if(response) {
    datas.value = response.data;

  }
}
</script>