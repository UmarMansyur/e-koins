<template>
  <Parent>
    <BreadCrumb title="Data Siswa" />
    <div class="row">
      <div class="col-md-2">
        <div class="input-group">
          <label for="limit" class="form-label mt-2 me-3">Limit: </label>
          <select name="limit" id="limit" class="form-select">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span class="mt-2 ms-3">Data</span>
        </div>
      </div>
      <div class="col-md-10 text-end">
        <button class="btn btn-warning"><i class="bx bx-printer"></i> Cetak Laporans</button>
        <button class="btn btn-success mx-1"><i class="bx bx-file"></i></button>
        <button class="btn btn-light"><i class="bx bx-filter"></i></button>
      </div>

    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="align-middle">
              <tr>
                <th>Tanggal</th>
                <th>Nama Siswa</th>
                <th class="text-center">Kelas</th>
                <th class="text-end">Kredit</th>
                <th class="text-end">Debit</th>
                <th class="text-end">Saldo</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr>
                <td>12 Desember 2023</td>
                <td>Khana Zulfana Imam</td>
                <td class="text-center">XI RPL</td>
                <td class="text-end">Rp. 100.000</td>
                <td class="text-end">Rp. 0</td>
                <td class="text-end">Rp. 100.000</td>
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
import Parent from "../../components/Parent.vue";
</script>