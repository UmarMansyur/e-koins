import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useSessionStore } from '../stores/session';
import { ref } from 'vue';
const isAdmin = ref<Boolean>(false);



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/administrator/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/authentication/Login.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
  {
    path: '/data-siswa',
    name: 'Data Siswa',
    component: () => import('../views/administrator/Student.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
  {
    path: '/transaksi/setoran',
    name: 'Setoran',
    component: () => import('../views/administrator/Deposit.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
  {
    path: '/transaksi/penarikan',
    name: 'Penarikan',
    component: () => import('../views/administrator/Kredit.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
  {
    path: '/laporan',
    name: 'Laporan',
    component: () => import('../views/administrator/Report.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
  {
    path: '/manajemen-tahun-ajar',
    name: 'Manajemen Tahun Ajar',
    component: () => import('../views/administrator/AcademycYear.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
  {
    path: '/pengaturan/operator',
    name: 'Operator',
    component: () => import('../views/administrator/Operator.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
  {
    path: '/pengaturan/profile',
    name: 'Profile',
    component: () => import('../views/administrator/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: async () => {

    }
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  document.title = to.name as string;
  // const { setUser, getUser } = useSessionStore();

  // if(to.name == 'Print Report' || to.name == 'Registrasi') {
  //   return true;
  // }

  // if (to.name != 'Login' && (!sessionStorage.getItem('token') || sessionStorage.getItem('token')!.length <= 13)) {
  //   return { path: '/login' };
  // }

  // if (sessionStorage.getItem('token') && to.name == 'Login') {
  //   return { path: '/' };
  // }
  // if (sessionStorage.getItem('token')  && to.name != 'login' && to.name != 'NotFound') {
  //   if (getUser.id === 0) {
  //     await setUser();
  //     isAdmin.value = getUser.role == 'Administrator' ? true : false;
  //     console.log(isAdmin.value);
  //   }
  // }
});

export default router;