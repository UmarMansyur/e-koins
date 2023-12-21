<template>
  <Parent>
    <BreadCrumb title="Data Siswa" />
    <template v-if="!addStudent">
      <div class="row">
        <div class="col-12 mb-3 text-end">
          <button class="btn btn-info" @click="addStudentClick">
            <i class="bx bx-plus-circle"></i> Tambah Siswa
          </button>
        </div>
      </div>
      <LimitAndSearch />
      <div class="row">
        <div class="col-12 mt-3">
          <div class="table-responsive">
            <table class="table">
              <thead class="align-middle">
                <tr>
                  <th class="text-center">
                    <div class="form-check d-flex justify-content-center">
                      <input class="form-check-input" type="checkbox" id="formCheck1">
                      <label for="formCheck1"></label>
                    </div>
                  </th>
                  <th>Nama Siswa</th>
                  <th class="text-center">Kelas</th>
                  <th class="text-center">Tahun Akademik</th>
                  <th class="text-center">Kode Qr</th>
                  <th class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr v-for="(item, index) in result" :key="index">
                  <td class="text-center">
                    <input class="form-check-input" type="checkbox" :id="'formCheck' + item.id">
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img :src="item.student.thumbnail" alt="user" class="img-fluid rounded-circle me-2" width="30">
                      <div>
                        <h6 class="mb-0">{{ item.student.name }}</h6>
                        <small>{{ item.student.email }}</small>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">
                    <span class="badge bg-info font-size-12">{{ item.class.name }} </span>
                  </td>
                  <td class="text-center">
                    <span class="badge bg-success font-size-12">{{ item.academicYears.name + ' - ' }} {{
                      item.academicYears.semester == 1 ? 'Ganjil' : 'Genap' }}</span>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-primary btn-sm" @click="handleQrCode(item.qrCode)" data-bs-toggle="modal" data-bs-target="#dinamyc-modal">
                      <i class="mdi mdi-qrcode font-size-14"></i> Lihat
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-warning btn-sm mx-2" @click="edit(1)">
                      <i class="bx bx-pencil"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" @click="hapus(1)"><i class="bx bx-trash"></i>Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal title="Lihat QR Code" >
        <div class="row">
          <div class="col-12 text-center">
            <h6 class="mb-3">E-Koins</h6>
            <img :src="qrCode" alt="" class="img-fluid">
            <p class="mt-3">Scan QR Code untuk melakukan transaksi</p>
            <button class="btn btn-success btn-sm" @click="downloadQr()" v-if="qrCode.length > 0"><i class="mdi mdi-download"></i> Download</button>
          </div>
        </div>
      </Modal>

      <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage" :go-to="goToPage"
        :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage" :total-data="totalData"
        v-if="result.length > 0" />
    </template>
    <template v-else>
      <div class="row">
        <div class="col-12" @click="back">
          <button class="btn btn-secondary"><i class="bx bx-arrow-back"></i></button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-7 col-12">
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
                <small>Untuk keamanan, password sengaja dikosongkan</small>
              </div>
              <div class="col-md-6 mb-3">
                <label for="role" class="form-label">Role: </label>

                <select class="form-select" aria-label="Default select example" v-model="role">
                  <!-- <option selected>Pilih Role</option> -->
                  <option value="Student" selected>Siswa</option>
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
              <div class="col-md-6 mb-3">
                <label for="kelas" class="form-label">Kelas: </label>
                <select class="form-select" aria-label="kelas" v-model="classId">
                  <option value="" disabled>Pilih Kelas</option>
                  <option v-for="(item, index) in classList" :key="index" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="tahun_akademik" class="form-label">Tahun Akademik: </label>
                <select class="form-select" aria-label="tahun_akademik" v-model="academicYearId">
                  <option value="" disabled>Pilih Tahun Akademik</option>
                  <option v-for="(item, index) in academyc_list" :key="index" :value="item.id">{{ item.name }} - {{
                    item.semester == 1 ? 'Ganjil' : 'Genap' }}</option>
                </select>
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

        <div class="col-md-5 d-none d-md-block">
          <img src="/images/student.svg" alt="" class="img-fluid">
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
import Modal from '../../components/Modal.vue';
const query = ref<string>('');
const firstQuery = ref<string>('?role=student');
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
} = usePagination("/user", firstQuery, query);

onMounted(async () => {
  isEnableLayer();
  await loadClass();
  await loadAcademyc();
  await fetchData();
  isDisableLayer();
});

const qrCode = ref<string>('');

const handleQrCode = (link: string) => {
  qrCode.value = link;
};

const downloadQr = () => {
  window.open(qrCode.value, '_blank');
};

const classList = ref<any>({});
const loadClass = async () => {
  const response = await getResource('/class?limi=1000');
  if (response) {
    classList.value = response.data.data;
  }
};

const academyc_list = ref<any>({});
const loadAcademyc = async () => {
  const response = await getResource('/academicYear?limit=1000');
  if (response) {
    academyc_list.value = response.data.data;
  }
};

const addStudent = ref(false);

const addStudentClick = () => {
  addStudent.value = true;
  id.value = 0;
  email.value = '';
  name.value = '';
  password.value = '';
  role.value = 'Student';
  gender.value = 'Pria';
  address.value = '';
  birthDate.value = '';
  phone.value = '';
  thumbnail.value = '';
  isDisableLayer();
};

const back = async () => {
  addStudent.value = false;
  await fetchData();
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
  classId: yup.string().required(),
  academicYearId: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    name: '',
    password: '',
    role: 'Student',
    gender: 'Pria',
    address: '',
    birthDate: '',
    phone: '',
    thumbnail: '',
    classId: '',
    academicYearId: '',
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
const { value: classId } = useField<string>('classId');
const { value: academicYearId } = useField<string>('academicYearId');

const getThumbnail = (e: any) => {
  thumbnail.value = e.target.files[0];
};

const { postResource, deleteResource, getResource, putResource, postResourceFile } = useApi();
const save = async () => {
  const data = {
    email: email.value,
    name: name.value,
    password: password.value,
    role: 'Student', // role.value, // 'Student',
    gender: gender.value,
    address: address.value,
    birthDate: birthDate.value,
    phone: phone.value,
    classId: classId.value,
    academicYearId: academicYearId.value,
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
  const response = await getResource('/user/' + i + '?role=student');
  if (response) {
    console.log(response);
    email.value = response.data.email;
    name.value = response.data.name;
    password.value = '';
    role.value = response.data.role;
    gender.value = response.data.gender;
    address.value = response.data.address;
    birthDate.value = response.data.birthDate;
    phone.value = response.data.phone;
    classId.value = response.data.classId;
    academicYearId.value = response.data.academicYearId;

    id.value = i;
    isDisableLayer();
    addStudent.value = true;
  }
}

</script>