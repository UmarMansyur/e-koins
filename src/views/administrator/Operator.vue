
<template>
  <Parent>
    <template v-if="!addStudent">
      <BreadCrumb title="Pengaturan Operator"></BreadCrumb>
      <div class="row">
        <div class="col-12 text-end">
          <button class="btn btn-info" @click="addStudentClick"><i class="bx bx-plus-circle"></i> Tambah Operator</button>
        </div>
      </div>
      <LimitAndSearch />
      <div class="row mt-2">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <thead class="align-middle">
                <tr>
                  <th class="text-center align-midle" style="width: 60px;">No</th>
                  <th>Nama Lengkap</th>
                  <th>Jenis Kelamin</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr class="align-middle" v-for="(item, index) in result" :key="index">
                  <td class="text-center">
                    {{ index + 1 }}
                  </td>
                  <td>
                    {{ item.name }}
                  </td>
                  <td>
                    {{ item.gender }}
                  </td>
                  <td>
                    {{ item.email }}
                  </td>
                  <td>
                    {{ item.address }}
                  </td>
                  <td class="text-center">
                    <button class="btn btn-sm btn-warning" @click="edit(item.id)"><i class="bx bx-pencil"></i>
                      Edit</button>
                    <button class="btn btn-sm btn-danger ms-2" @click="hapus(item.id)" v-if="item.id != session.getUser.id"><i class="bx bx-trash"></i>
                      Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage"
            :go-to="goToPage" :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage"
            :total-data="totalData" v-if="result.length > 0" />
        </div>
      </div>
    </template>
    <template v-else>
      <BreadCrumb title="Pengaturan Operator"></BreadCrumb>
      <div class="row">
        <div class="col-12" @click="back">
          <button class="btn btn-secondary"><i class="bx bx-arrow-back"></i></button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-8">
          <form role="doc-part">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="operator" class="form-label">Nama Lengkap: </label>
                <input type="text" name="operator" id="operator" class="form-control" placeholder="Masukkan Nama Lengkap"
                  v-model="name">
              </div>
              <div class="col-md-6 mb-3">
                <label for="email" class="form-label">Email: </label>
                <input type="text" name="email" id="email" class="form-control" placeholder="Masukkan Email"
                  v-model="email">
              </div>
              <div class="col-md-6 mb-3">
                <label for="password" class="form-label">Password: </label>
                <input type="password" name="password" id="password" class="form-control" placeholder="Masukkan Password"
                  v-model="password">
                  <small v-if="id > 0">Untuk keamanan, password sengaja dikosongkan</small>
              </div>
              <div class="col-md-6 mb-3">
                <label for="role" class="form-label">Role: </label>

                <select class="form-select" aria-label="Default select example" v-model="role">
                  <option selected>Pilih Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Student">Siswa</option>
                  <option value="Buyer">Penjual</option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="role" class="form-label">Tanggal Lahir: </label>
                <input name="date" id="date" class="form-control" type="date" v-model="birthDate">
              </div>
              <div class="col-md-4 mb-3">
                <label for="role" class="form-label">Nomer Hp: </label>
                <input type="text" name="role" id="role" class="form-control" placeholder="Masukkan Nomer Hp"
                  v-model="phone">
              </div>
              <div class="col-md-4 mb-3">
                <label for="gender" class="form-label">Jenis Kelamin: </label>
                <div class="input-group">
                  <div class="form-check mt-2 me-3">
                    <input class="form-check-input" type="radio" name="gender" id="male" :value="'Pria'" v-model="gender">
                    <label class="form-check-label" for="male">
                      Laki-laki
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input class="form-check-input" type="radio" name="gender" id="female" :value="'Perempuan'"
                      v-model="gender">
                    <label class="form-check-label" for="female">
                      Perempuan
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="thumbnail" class="form-label">Foto: </label>
                <input type="file" name="thumbnail" id="thumbnail" class="form-control" placeholder="Masukkan Foto"
                  @change="getThumbnail">
              </div>
              <div class="col-md-12">
                <label for="address" class="form-label">Alamat: </label>
                <textarea name="address" id="address" class="form-control" cols="30" rows="5"
                  v-model="address"></textarea>
              </div>
              <div class="col-md-6 mt-3 text-start">
                <button class="btn btn-light"><i class="bx bx-revision"></i> Reset</button>
              </div>
              <div class="col-md-6 mt-3 text-end">
                <button type="button" class="btn btn-info" :disabled="!meta.valid" @click="save"><i
                    class="bx bx-send"></i> Simpan</button>
              </div>
            </div>

          </form>
        </div>
        <div class="col-md-4">
          <img src="/images/operator.svg" alt="" class="img-fluid">
        </div>
      </div>

    </template>

  </Parent>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BreadCrumb from '../../components/BreadCrumb.vue';
import LimitAndSearch from '../../components/LimitAndSearch.vue';
import Parent from '../../components/Parent.vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import useApi from '../../composables/api';
import Notify from '../../helpers/notify';
import { isDisableLayer, isEnableLayer } from '../../helpers/handleEvent';
import usePagination from '../../composables/pagination';
import Pagination from '../../components/Pagination.vue';
import { useSessionStore } from '../../stores/session';
const query = ref<string>('');
const {
  result,
  totalData,
  currentPage,
  totalPage,
  pageList,
  isFirstPage,
  isLastPage,
  nextPage,
  prevPage,
  goToPage,
  fetchData,
} = usePagination("/user", '', query);

onMounted(async () => {
  isEnableLayer();
  await fetchData();
  isDisableLayer();
});

const addStudent = ref(false);
const session = useSessionStore();
const addStudentClick = () => {
  addStudent.value = true;
  clearForm();
  isDisableLayer();
};

const clearForm = () => {
  id.value = 0;
  email.value = '';
  name.value = '';
  password.value = '';
  role.value = '';
  gender.value = 'Pria';
  address.value = '';
  birthDate.value = '';
  phone.value = '';
  thumbnail.value = '';
}

const back = async () => {
  addStudent.value = false;
  await fetchData();
  clearForm();
  isDisableLayer();
};

const schema = yup.object().shape({
  id: yup.string(),
  email: yup.string().required().email(),
  name: yup.string().required(),
  password: yup.string(),
  role: yup.string().required(),
  gender: yup.string().required(),
  address: yup.string().required(),
  birthDate: yup.string().required(),
  phone: yup.string().required(),
  thumbnail: yup.string(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    name: '',
    password: '',
    role: '',
    gender: 'Pria',
    address: '',
    birthDate: '',
    phone: '',
    thumbnail: '',
    id: 0
  }
});

const { value: email } = useField<string>('email');
const { value: name } = useField<string>('name');
const { value: password } = useField<string>('password');
const { value: role } = useField<string>('role');
const { value: gender } = useField<string>('gender');
const { value: address } = useField<string>('address');
const { value: birthDate } = useField<string>('birthDate');
const { value: phone } = useField<string>('phone');
const { value: thumbnail } = useField<string>('thumbnail');
const { value: id } = useField<number>('id');

const getThumbnail = (e: any) => {
  thumbnail.value = e.target.files[0];
};
const { postResource, deleteResource, getResource, putResource, postResourceFile } = useApi();
const save = async () => {
  const data = {
    email: email.value,
    name: name.value,
    password: password.value,
    role: role.value,
    gender: gender.value,
    address: address.value,
    birthDate: birthDate.value,
    phone: phone.value
  };

  let response;

  if (id.value > 0) {
    response = await putResource('/user/' + id.value, data);
    id.value = 0;
  } else {
    response = await postResource('/user', data);
  }
  if (response) {
    if (thumbnail.value == '') {
      Notify.success(response.message);
      back();
      return;
    }

    let thumbnailId = id.value > 0 ? id.value : response.data.id;
    const result = await postResourceFile('user/thumbnail/' + thumbnailId, 'POST', {
      thumbnail: thumbnail.value
    });
    id.value = 0;
    if (result) {
      isDisableLayer();
      Notify.success(response.message);
      back();
      return;
    }
    isDisableLayer();
  }
};

const hapus = async (i: number) => {
  Notify.confirm('Apakah anda yakin ingin menghapus data ini?', async () => {
    const response = await deleteResource('/user/' + i);
    if (response) {
      Notify.success(response.message);
      await fetchData();
    }
  });
};

const edit = async (i: number) => {
  const response = await getResource('/user/' + i);
  if (response) {
    email.value = response.data.email;
    name.value = response.data.name;
    password.value = '';
    role.value = response.data.role;
    gender.value = response.data.gender;
    address.value = response.data.address;
    birthDate.value = response.data.birthDate;
    phone.value = response.data.phone;
    id.value = i;
    isDisableLayer();
    addStudent.value = true;
  }
}

</script>