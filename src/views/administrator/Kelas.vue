
<template>
  <Parent>
    <BreadCrumb title="Manajemen Tahun Ajar" />
    <div class="row">
      <div class="col-md-12 text-end">
        <button class="btn btn-info" data-bs-target="#dinamyc-modal" data-bs-toggle="modal" @click="resetValue"><i
            class="bx bx-plus-circle"></i> Tambah Kelas</button>
        <Modal title="Tambah Tahun Ajar">
          <div class="row">
            <div class="col-md-12 mb-3 text-start">
              <label for="username" class="form-label">Kelas</label>
              <input type="text" id="username" class="form-control" v-model="kelas">
            </div>
            <div class="col-6 mb-3 text-start">
              <button class="btn btn-danger" data-bs-dismiss="modal"><i class="bx bx-x"></i> Batal</button>
            </div>
            <div class="col-6 mb-3 text-end">
              <button class="btn btn-info" :disabled="!meta.valid" @click="save" data-bs-dismiss="modal"><i
                  class="bx bx-save"></i> Simpan</button>
            </div>
          </div>
        </Modal>
      </div>
      <div class="col-md-12">
        <LimitAndSearch :search="search" :changeLimit="changeLimit" />
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-striped">
                <thead class="align-middle">
                  <tr>
                    <th class="text-center" style="width: 80px;">No</th>
                    <th>Nama Kelas</th>
                    <th class="text-center" style="width: 10%;">Jumlah Siswa</th>
                    <th class="text-center" style="width: 30%;">Aksi</th>
                  </tr>
                </thead>
                <tbody class="align-middle">
                  <tr v-for="(item, index) in result" :key="index">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td class="text-center">
                      {{ item.totalStudent }}
                    </td>
                    <td class="text-center">
                      <button type="button" class="btn btn-sm btn-warning waves-effect btn-label waves-light mx-2"
                        data-bs-toggle="modal" data-bs-target="#dinamyc-modal" @click="edit(item.id)">
                        <i class="bx bx-pencil label-icon"></i>
                        Edit</button>
                      <button type="button" class="btn btn-sm btn-danger waves-effect btn-label waves-light" @click="hapus(item.id)">
                        <i class="bx bx-trash label-icon"></i>
                        Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-12">
            <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage"
              :go-to="goToPage" :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage"
              :total-data="totalData" v-if="result.length > 0" />
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import BreadCrumb from '../../components/BreadCrumb.vue';
import Pagination from '../../components/Pagination.vue';
import LimitAndSearch from '../../components/LimitAndSearch.vue';
import Modal from '../../components/Modal.vue';
import Parent from '../../components/Parent.vue';
import * as yup from 'yup';
import useApi from '../../composables/api';
import { isDisableLayer, isEnableLayer } from '../../helpers/handleEvent';
import usePagination from '../../composables/pagination';
import { onMounted, ref } from 'vue';
import Notify from '../../helpers/notify';
const query = ref<string>('');
const {
  result,
  totalData,
  currentPage,
  totalPage,
  pageList,
  search,
  isFirstPage,
  isLastPage,
  nextPage,
  prevPage,
  goToPage,
  fetchData,
  changeLimit
} = usePagination("/class", '', query);

onMounted(async () => {
  isEnableLayer();
  await fetchData();
  isDisableLayer();
});

const schema = yup.object().shape({
  kelas: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    kelas: '',
  },
});

const { value: kelas } = useField<string>('kelas');

const { postResource, getResource, putResource, deleteResource } = useApi();
const save = async () => {
  const data = {
    name: kelas.value,
  };
  let response;
  if (id.value > 0) {
    response = await putResource('/class/' + id.value, data);
    id.value = 0;
  } else {
    response = await postResource('/class', data);
  }
  if (response) {
    Notify.success(response.message);
    await fetchData();
    isDisableLayer();
  }

  kelas.value = '';
};

const id = ref<number>(0);
const edit = async (i: number) => {
  const response = await getResource('/class/' + i);
  if (response) {
    kelas.value = response.data.name;
    id.value = i;
    isDisableLayer();
  }
};

const hapus = async (i: number) => {
  Notify.confirm('Apakah anda yakin ingin menghapus data ini?', async () => {
    const response = await deleteResource('/class/' + i);
    if (response) {
      Notify.success(response.message);
      await fetchData();
    }
  });
};

const resetValue = () => {
  kelas.value = '';
  id.value = 0;
};
</script>