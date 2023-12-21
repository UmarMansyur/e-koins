<template>
  <div class="tab-pane" id="about" role="tabpanel">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">Akun</h5>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <label for="email" class="col-sm-3 col-form-label">Email: </label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="email" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="row mb-4">
          <label for="password" class="col-sm-3 col-form-label">Password: </label>
          <div class="col-sm-9">
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="row mb-4">
          <label for="confirmation_password" class="col-sm-3 col-form-label">Konfirmasi Password: </label>
          <div class="col-sm-9">
            <input type="password" class="form-control" id="confirmation_password" placeholder="Konfirmasi Password" v-model="confirmation_password">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-9">
            <button class="btn btn-info" @click="updateAccount" :disabled="!meta.valid"><i class="bx bx-send"></i> Simpan</button>
          </div>
        </div>
      </div>
      <!-- end card body -->
    </div>
    <!-- end card -->
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import Notify from '../../helpers/notify';
import { useSessionStore } from '../../stores/session';
import useApi from '../../composables/api';
import { isDisableLayer } from '../../helpers/handleEvent';
import { computed } from 'vue';
import { watch } from 'vue';

const props = defineProps({
  email: {
    type: String,
    default: ''
  }
});




const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmation_password: yup.string().required()
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
    confirmation_password: ''
  },
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: confirmation_password } = useField<string>('confirmation_password');


const session = useSessionStore();
const emailComputed = computed(() => props.email);
watch(emailComputed, (value) => {
  email.value = value;
})

const { putResource } = useApi();



const updateAccount = async () => {
  Notify.confirm('Apakah anda yakin ingin mengubah akun ini ?', async () => {

    if(password.value !== confirmation_password.value) {
      Notify.error('Password tidak sama');
      return;
    }

    const data = {
      email: email.value,
      password: password.value,
    }

    const response = await putResource('/user/' + session.getUser.id, data);
    if(response) {
      Notify.success('Berhasil mengubah akun');
    }
    isDisableLayer();
  })

}
</script>