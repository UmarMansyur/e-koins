<template>
  <Parent>
    <BreadCrumb title="Manajemen Tahun Ajar" />
    <div class="row">
      <div class="col-md-12 text-end">
        <button class="btn btn-info"><i class="bx bx-plus-circle"></i> Tambah Tahun Ajar</button>
      </div>
      <div class="col-md-12">
        <LimitAndSearch/>
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead class="text-align-middle">
                  <tr>
                    <th class="text-center">No</th>
                    <th>Tahun Akademik</th>
                    <th>Semester</th>
                    <th class="text-center">Status</th>
                    <th class="text-center" style="width: 20%;">Aksi</th>
                  </tr>
                </thead>
                <tbody class="align-middle">
                  <tr>
                    <td class="text-center">1</td>
                    <td>2023/2024</td>
                    <td>Genap</td>
                    <td class="text-center"><span class="badge bg-success-subtle font-size-13">Aktif</span></td>
                    <td class="text-center">
                      <button type="button" class="btn btn-warning waves-effect btn-label waves-light mx-2"><i class="bx bx-pencil label-icon"></i> Edit</button>
                      <button type="button" class="btn btn-danger waves-effect btn-label waves-light"><i class="bx bx-trash label-icon"></i> Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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