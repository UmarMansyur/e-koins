<template>
  <Parent>
    <BreadCrumb title="Setoran" />
    <div class="row">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <form role="alert">
              <div class="row mb-4">
                <label for="username" class="col-sm-3 col-form-label">Nama Lengkap: </label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="username" placeholder="Nama Siswa">
                </div>
              </div>
              <div class="row mb-4">
                <label for="class" class="col-sm-3 col-form-label">Kelas: </label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="class" placeholder="Kelas">
                </div>
              </div>
              <div class="row mb-4">
                <label for="foto" class="col-sm-3 col-form-label">Foto:</label>
                <div class="col-sm-9">
                  <img src="https://api.unira.ac.id/img/profil/mhs/8e35dc4c9c4b61b341800d1ef1f10eba.jpg" alt="thumbnail"
                      class="img-fluid" width="130">
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
                    <h4 class="alert-heading">Setoran</h4>
                    <p class="mb-1">Untuk melakukan setoran, silahkan isi nominal yang akan disetor pada kolom nominal.</p>
                    
                  </div>
                </div>
              </div>
              <div class="row mb-4">
                <label for="saldo" class="col-sm-3 col-form-label">Saldo</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="saldo" placeholder="Rp. 0">
                </div>
              </div>
              <div class="row mb-4">
                <label for="saldo" class="col-sm-3 col-form-label">Nominal</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="saldo" placeholder="Rp. 0">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-sm-12">
                  <button class="btn btn-danger float-start"><i class="bx bx-revision"></i>Batal</button>
                  <button class="btn btn-info float-end"><i class="bx bx-send"></i> Simpan</button>
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
import BreadCrumb from "../../components/BreadCrumb.vue";
import Parent from "../../components/Parent.vue";
</script>