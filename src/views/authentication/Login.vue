<template>
  <section
    class="auth-page-wrapper py-5 position-relative d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row g-0">
                <div class="col-lg-5">
                  <div class="card auth-card bg-info h-100 border-0 shadow-none p-sm-3 overflow-hidden mb-0">
                    <div class="card-body p-4 d-flex justify-content-between flex-column">
                      <div class="auth-image mb-3">
                        <img src="/images/logo.svg" alt="img" height="40"><img
                          src="/images/effect-pattern/auth-effect-2.png" alt="img" class="auth-effect-2">
                        <img src="/images/effect-pattern/auth-effect.png" alt="img" class="auth-effect">
                        <img src="/images/effect-pattern/auth-effect.png" alt="img" class="auth-effect-3">
                      </div>
                      <div>
                        <h3 class="text-white">E-Koin</h3>
                        <p class="text-white fs-15">E-Koin adalah aplikasi yang digunakan untuk mengelola simpanan murid
                          hemat.</p>
                      </div>
                      <div class="text-center text-white">
                        <p class="mb-0">© 2023 E-Koin. Crafted with <i class="mdi mdi-heart text-danger"></i> by Khana
                          Zulfana</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-7">
                  <div class="card mb-0 border-0 shadow-none">
                    <div class="card-body px-0 p-sm-5 m-lg-4">
                      <div class="text-center mt-2">
                        <h5 class="text-info fs-20">Welcome Back !</h5>
                        <p class="text-muted">Log in to continue to E-Koin.</p>
                      </div>
                      <div class="p-2 mt-5">
                        <form action="index.html">
                          <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" name="username"
                              placeholder="Masukkan username" autocomplete="on" v-model="username">
                          </div>
                          <div class="mb-3">
                            <div class="float-end">
                              <a href="auth-pass-reset-basic.html" class="text-muted">Reset
                                password?</a>
                            </div>
                            <label class="form-label" for="password-input">Password</label>
                            <div class="position-relative auth-pass-inputgroup mb-3">
                              <input type="password" class="form-control pe-5 password-input" placeholder="Masukkan password"
                                id="password-input" name="password" v-model="password">
                              <button
                                class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                type="button" id="password-addon" @click="handlePassword">
                                <i :class="iconPassword" id="icon-password"></i>
                              </button>
                            </div>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="auth-remember-check" v-model="remember">
                            <label class="form-check-label" for="auth-remember-check">Remember me</label>
                          </div>
                          <div class="mt-4">
                            <button class="btn btn-info w-100" :disabled="!meta.valid" type="button" @click="tryLogin">Sign in</button>
                          </div>
                        </form>
                        <div class="text-center mt-3">
                          <p class="mb-0">Don't have an account ?
                            <b class="text-info">Please contact your
                              administrator!</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useForm, useField } from "vee-validate";
import useToken from '../../composables/token';
import { useSessionStore } from '../../stores/session';
import router from '../../router';
import { onMounted, ref } from 'vue';

const { setToken } = useToken();
const session = useSessionStore();

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  remember: yup.boolean(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    username: '',
    password: '',
    remember: false,
  },
});

const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');
const { value: remember } = useField<boolean>('remember');

onMounted(() => {
  if(localStorage.getItem('username') && localStorage.getItem('password')) {
    username.value = localStorage.getItem('username') || '';
    password.value = localStorage.getItem('password') || '';
    remember.value = true;
  }
});

const tryLogin = async () => {
  const response = await fetch('http://156.67.221.188:1304/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    }),
  });

  const data = await response.json();
  await setToken(data.data.token);
  session.setUser();
  if(remember.value) {
    localStorage.setItem('username', username.value);
    localStorage.setItem('password', password.value);
  }
  router.replace('/');
};

const iconPassword = ref('mdi mdi-eye-outline');
const handlePassword = () => {
  const passwordInput = document.getElementById('password-input');
  const passwordAddon = document.getElementById('password-addon');
  if (passwordInput?.getAttribute('type') === 'password') {
    passwordInput.setAttribute('type', 'text');
    passwordAddon?.classList.add('show');
    iconPassword.value = 'mdi mdi-eye-off-outline';
  } else {
    passwordInput?.setAttribute('type', 'password');
    passwordAddon?.classList.remove('show');
    iconPassword.value = 'mdi mdi-eye-outline';
  }
};




</script>


<style scoped>
.auth-effect,
.auth-effect-2,
.auth-effect-3 {
  position: absolute;
  z-index: -1;
}

.auth-effect-2 {
  top: 0;
  right: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.auth-effect {
  top: -25px;
  left: -30px;
}

.auth-effect-3 {
  bottom: -25px;
  right: -30px;
}

.bg-primary {
  --tb-bg-opacity: 1;
  background-color: rgba(67, 142, 255,
      0.1) !important;
}
</style>