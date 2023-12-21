
<template>
  <Parent>
    <div class="row">
      <div class="col-xl-12 col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm order-2 order-sm-1">
                <div class="d-flex align-items-start mt-3 mt-sm-0">
                  <div class="flex-shrink-0">
                    <div class="avatar-xl me-3">
                      <img :src="session.getUser.thumbnail" alt=""
                        class="img-fluid rounded-circle avatar-xl img-thumbnail d-block">
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <h5 class="font-size-16 mb-1">{{ session.getUser.name }}</h5>
                      <p class="text-muted font-size-13 mb-2">{{ session.getUser.role }}</p>
                      <div class="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                        <div>
                          <i class="mdi mdi-email me-1 text-info"></i> {{ session.getUser.email }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-auto order-1 order-sm-2">
                <div class="d-flex align-items-start justify-content-end gap-2">
                  <div>
                    <button type="button" class="btn btn-warning"><i class="bx bx-key"></i> Update Akun</button>
                  </div>
                </div>
              </div>
            </div>

            <ul class="nav nav-tabs-custom card-header-tabs border-top mt-4" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link px-3 active" data-bs-toggle="tab" href="#overview" role="tab"
                  aria-selected="true">Biodata</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link px-3" data-bs-toggle="tab" href="#about" role="tab" aria-selected="false"
                  tabindex="-1">Akun</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-pane active show" id="overview" role="tabpanel">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Biodata</h5>
              </div>
              <div class="card-body">
                <div>
                  <div class="pb-3">
                    <div class="row">
                      <div class="mt-4 mt-lg-0">
                        <form>
                          <div class="row mb-4">
                            <label for="username" class="col-sm-3 col-form-label">Nama Lengkap: </label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" id="username" placeholder="Username" v-model="name">
                            </div>
                          </div>
                          <div class="row mb-4">
                            <label for="role" class="col-sm-3 col-form-label">Role: </label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" id="role" placeholder="Role" v-model="role">
                            </div>
                          </div>
                          <div class="row mb-4">
                            <label for="role" class="col-sm-3 col-form-label">Jenis Kelamin: </label>
                            <div class="col-sm-9 d-flex">
                              <div class="form-check form-switch mt-2" dir="ltr">

                                <input type="checkbox" class="form-check-input" id="male" value="Pria" v-model="male"
                                  @click="handleGender">
                                <label class="form-check-label" for="male">Pria</label>
                              </div>
                            </div>
                            <div class="col-sm-3"></div>
                            <div class="col-sm-9">
                              <div class="form-check form-switch mt-2" dir="ltr">
                                <input type="checkbox" class="form-check-input" id="female" value="Perempuan"
                                  v-model="female" @click="handleGender">
                                <label class="form-check-label" for="female">Perempuan</label>
                              </div>
                            </div>
                          </div>
                          <div class="row mb-4">
                            <label for="address" class="col-sm-3 col-form-label">Alamat: </label>
                            <div class="col-sm-9">
                              <textarea class="form-control" id="address" placeholder="Alamat" v-model="address" cols="5"
                                rows="10"></textarea>
                            </div>
                          </div>
                          <div class="row mb-4">
                            <label for="phone" class="col-sm-3 col-form-label">No.Hp: </label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" id="phone" placeholder="No. Hp" v-model="phone">
                            </div>
                          </div>
                          <div class="row mb-4">
                            <label for="birthday" class="col-sm-3 col-form-label">Tanggal Lahir: </label>
                            <div class="col-sm-9">
                              <input type="date" class="form-control" id="birthday" placeholder="Tanggal Lahir"
                                v-model="birthDate">
                            </div>
                          </div>

                          <div class="row mb-4">
                            <label for="foto" class="col-sm-3 col-form-label">Foto: </label>
                            <div class="col-sm-9">
                              <input type="file" class="form-control" id="foto" placeholder="Foto"
                                @change="handleFileUpload">
                            </div>
                          </div>

                          <div class="row justify-content-end">
                            <div class="col-sm-9">
                              <div>

                                <button type="button" class="btn btn-info" :disabled="!meta.valid" @click="saveUpdate">
                                  <i class="bx bx-save"></i> Simpan
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProfileAccount :email="email"/>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import Parent from '../../components/Parent.vue';
import { useSessionStore } from '../../stores/session';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import useApi from '../../composables/api';
import { isDisableLayer, isEnableLayer } from '../../helpers/handleEvent';
import Notify from '../../helpers/notify';
import ProfileAccount from './ProfileAccount.vue';

const session = useSessionStore();

const schema = yup.object().shape({
  name: yup.string().required(),
  role: yup.string().required(),
  male: yup.bool(),
  female: yup.bool(),
  address: yup.string().required(),
  phone: yup.string().required(),
  birthDate: yup.string().required(),
  thumbnail: yup.string(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    role: '',
    address: '',
    phone: '',
    birthDate: '',
    thumbnail: '',
    female: ''
  }
});

const { value: name } = useField<string>('name');
const { value: role } = useField<string>('role');
const { value: female } = useField<boolean>('female');
const { value: address } = useField<string>('address');
const { value: phone } = useField<string>('phone');
const { value: birthDate } = useField<string>('birthDate');
const { value: thumbnail } = useField<string>('thumbnail');
const { value: male } = useField<boolean>('male');
const handleFileUpload = (e: any) => {
  const file = e.target.files[0];
  thumbnail.value = file;
};



const email = ref<string>('');
onMounted(async () => {
  isEnableLayer();
  await tryFetch();
  isDisableLayer();

});

const { getResource, putResource, postResourceFile } = useApi();
const tryFetch = async () => {
  const response = await getResource('/auth/whoami');
  if (response) {
    name.value = response.data.name;
    if (response.data.gender == 'Perempuan') {
      female.value = true;
    }
    if (response.data.gender == 'Pria') {
      male.value = true;
    }
    email.value = response.data.email;
    role.value = response.data.role;
    address.value = response.data.address;
    phone.value = response.data.phone;
    birthDate.value = new Date(response.data.birthDate).toISOString().slice(0, 10);
  }
};

const handleGender = () => {
  male.value = !male.value;
  female.value = !female.value;
  if (male.value) {
    female.value = false;
  }
  if (female.value) {
    male.value = false;
  }
};



const saveUpdate = async () => {
  const data = {
    name: name.value,
    role: role.value,
    gender: male.value ? 'Pria' : 'Perempuan',
    address: address.value,
    phone: phone.value,
    birthDate: birthDate.value,
  };

  Notify.confirm('Apakah anda yakin ingin memperbaharui profile?', async function () {
    isEnableLayer();
    const response = await putResource('/user/' + session.getUser.id, data);
    if (thumbnail.value != "") {
      await postResourceFile('user/thumbnail/' + session.getUser.id, 'POST', { thumbnail: thumbnail.value });
      thumbnail.value = "";
    }
    if (response) {
      Notify.success('Profile berhasil diperbaharui');
    }
    await tryFetch();
    isDisableLayer();
  });

};
</script>