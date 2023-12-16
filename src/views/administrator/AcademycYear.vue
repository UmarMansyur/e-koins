<template>
  <Parent>
    <BreadCrumb title="Manajemen Tahun Ajar" />
    <div class="row">
      <div class="col-md-12 text-end">
        <button class="btn btn-info" data-bs-target="#dinamyc-modal" data-bs-toggle="modal"><i
            class="bx bx-plus-circle"></i> Tambah Tahun Ajar</button>
        <Modal title="Tambah Tahun Ajar">
          <div class="row">
            <div class="col-md-12 mb-3 text-start">
              <label for="username" class="form-label">Tahun Akademik:</label>
              <input type="text" id="username" class="form-control" v-model="tahun_akademik">
            </div>
            <div class="col-md-12 mb-3 text-start">
              <label for="password" class="form-label">Semester:</label>
              <select class="form-select" v-model="semester">
                <option selected>Pilih Semester</option>
                <option value="1">Ganjil</option>
                <option value="2">Genap</option>
              </select>
            </div>
            <div class="col-md-12">
              <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                <input type="checkbox" class="form-check-input" id="customSwitch1" v-model="status">
                <label class="form-check-label" for="customSwitch1">Aktif</label>
              </div>
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
                  <tr v-for="(item, index) in result" :key="index">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.semester == 1 ? 'Ganjil' : 'Genap' }}</td>
                    <td class="text-center">
                      <span class="badge font-size-13"
                        :class="item.status == 1 ? 'bg-success-subtle' : 'bg-danger-subtle'">{{ item.status == 1 ? 'Aktif'
                          : 'Tidak Aktif' }}</span>
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
} = usePagination("/academicYear", '', query);

onMounted(async () => {
  isEnableLayer();
  await fetchData();
  isDisableLayer();
});

const schema = yup.object().shape({
  tahun_akademik: yup.string().required(),
  semester: yup.string().required(),
  status: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    tahun_akademik: '',
    semester: '',
    status: false,
  },
});

const { value: tahun_akademik } = useField<string>('tahun_akademik');
const { value: semester } = useField<string>('semester');
const { value: status } = useField<boolean>('status');

const { postResource, getResource, putResource, deleteResource } = useApi();
const save = async () => {
  const data = {
    name: tahun_akademik.value,
    semester: Number(semester.value),
    status: status.value,
  };
  let response;
  if (id.value > 0) {
    response = await putResource('/academicYear/' + id.value, data);
    id.value = 0;
  } else {
    response = await postResource('/academicYear', data);
  }
  if (response) {
    Notify.success(response.message);
    await fetchData();
    isDisableLayer();
  }

  tahun_akademik.value = '';
  semester.value = '';
  status.value = false;
};

const id = ref<number>(0);

const edit = async (i: number) => {
  const response = await getResource('/academicYear/' + i);
  if (response) {
    tahun_akademik.value = response.data.name;
    semester.value = response.data.semester;
    status.value = response.data.status;
    id.value = i;
    isDisableLayer();
  }
};

const hapus = async (i: number) => {
  Notify.confirm('Apakah anda yakin ingin menghapus data ini?', async () => {
    const response = await deleteResource('/academicYear/' + i);
    if (response) {
      Notify.success(response.message);
      await fetchData();
    }
  });
};

</script>