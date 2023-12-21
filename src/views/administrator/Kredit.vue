<template>
  <Parent>
    <BreadCrumb title="Penarikan" />
    <div class="row">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <form role="alert">
              <div class="row mb-4">
                <label for="username" class="col-sm-3 col-form-label">Nama Lengkap: </label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="username" placeholder="Nama Siswa" readonly :value="session.name">
                </div>
              </div>
              <div class="row mb-4">
                <label for="class" class="col-sm-3 col-form-label">Kelas: </label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="class" placeholder="Kelas" readonly :value="session.class">
                </div>
              </div>
              <div class="row mb-4">
                <label for="foto" class="col-sm-3 col-form-label">Foto:</label>
                <div class="col-sm-9">
                  <img :src="session.thumbnail != null ? session.thumbnail : ''" alt="Foto" class="img-thumbnail" width="140">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card">
          <div class="card-body">
            <form role="doc-abstract">
              <div class="row">
                <div class="mb-4">
                  <div class="alert alert-success text-center">
                    <h4 class="alert-heading">Penarikan</h4>
                    <p class="mb-1">Untuk melakukan penarikan, silahkan isi nominal yang akan disetor pada kolom nominal.</p>
                    
                  </div>
                </div>
              </div>
              <div class="row mb-4">
                <label for="saldo" class="col-sm-3 col-form-label">Saldo</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="saldo" placeholder="Rp. 0" readonly :value="convertToRp(session.saldo > 0 ? session.saldo.toString() : '0')">
                </div>
              </div>
              <div class="row mb-4">
                <label for="saldo" class="col-sm-3 col-form-label">Nominal</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="saldo" placeholder="Rp. 0" v-model="nominal" @keyup="convertNominal">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-sm-12">
                  <button class="btn btn-danger float-start"><i class="bx bx-revision"></i>Batal</button>
                  <button type="button" class="btn btn-info float-end" @click="save"><i class="bx bx-send"></i> Simpan</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BreadCrumb from "../../components/BreadCrumb.vue";
import Parent from "../../components/Parent.vue";
import { convertToRp, isDisableLayer } from "../../helpers/handleEvent";
import { useStudentStore } from "../../stores/student";
import useApi from "../../composables/api";
import Notify from "../../helpers/notify";
const session = useStudentStore();

const nominal = ref('');
const convertNominal = () => {
  nominal.value = nominal.value.replace(/\D/g, '');
  nominal.value = nominal.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  nominal.value = 'Rp. ' + nominal.value;
};

const convertToNumber = () => {
  return nominal.value.replace(/\D/g, '');  
};

const { postResource } = useApi();

const save = async () => {
  const data = {
    amount: Number(convertToNumber()),
    saldo: session.saldo,
    type: 'Refund',
    studentClassId:  session.studentId
  }

  const response = await postResource('/transaction', data);
  if(response) {
    Notify.success('Berhasil melakukan setoran');
  }
  session.$reset();
  isDisableLayer();
}

</script>