<template>
  <Parent>
    <BreadCrumb title="Data Siswa" />
    <div class="row">
      <div class="col-12 mb-3 text-end">
        <button class="btn btn-info">
          <i class="bx bx-plus-circle"></i> Tambah Siswa
        </button>
      </div>
    </div>
    <LimitAndSearch/>
    <div class="row">
      <div class="col-12 mt-3">
        <div class="table-responsive">
          <table class="table table-bordered font-size-13">
            <thead class="align-middle">
              <tr>
                <th rowspan="2" class="text-center">No</th>
                <th colspan="2" class="text-center">Siswa</th>
                <th rowspan="2" class="text-center">Kode Qr</th>
                <th rowspan="2" class="text-center">Aksi</th>
              </tr>
              <tr>
                <th>Nama Siswa</th>
                <th>Kelas</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr>
                <td class="text-center">1</td>
                <td>Khana Zulfana Imam</td>
                <td>XII RPL 1</td>
                <td class="text-center">
                  <!-- <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Khana Zulfana Imam" alt="qr-code"> -->
                  <button class="btn btn-outline-success btn-sm">Lihat</button>
                </td>
                <td class="text-center">
                  <button class="btn btn-warning btn-sm mx-2">
                    <i class="bx bx-pencil"></i> Edit
                  </button>
                  <button class="btn btn-danger btn-sm"><i class="bx bx-trash"></i>Hapus</button>
                </td>


              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import BreadCrumb from "../../components/BreadCrumb.vue";
import LimitAndSearch from "../../components/LimitAndSearch.vue";
import Parent from "../../components/Parent.vue";
</script>