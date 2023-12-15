
<template>
  <Parent>
    <BreadCrumb title="Pengaturan Operator"></BreadCrumb>
    <LimitAndSearch />
    <div class="row mt-2">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead class="align-middle">
              <tr>
                <th class="text-center align-midle" style="width: 60px;">No</th>
                <th>Username</th>
                <th>Jenis Kelamin</th>
                <th>Email</th>
                <th>Alamat</th>
                <th class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr class="align-middle">
                <td class="text-center">
                  1.
                </td>
                <td>
                  Khana Zulfana Imam
                </td>
                <td>
                  Laki-laki
                </td>
                <td>
                  khanazulfanaimam@alghazali.sch.id
                </td>
                <td>
                  Jl. Raya Cikarang Cibarusah No. 1
                </td>
                <td class="text-center">
                  <button class="btn btn-warning"><i class="bx bx-pencil"></i> Edit</button>
                  <button class="btn btn-danger ms-2"><i class="bx bx-trash"></i> Hapus</button>
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
import BreadCrumb from '../../components/BreadCrumb.vue';
import LimitAndSearch from '../../components/LimitAndSearch.vue';
import Parent from '../../components/Parent.vue';


</script>