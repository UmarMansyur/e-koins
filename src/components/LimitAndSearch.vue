<template>
  <div class="row">
    <div class="col-md-2 mt-3">
      <div class="input-group">
        <label for="limit" class="form-label mt-2 me-2">Limit: </label>
        <select name="limit" id="limit" class="form-select">
          <option value="10">10</option>
        </select>
        <span class="ms-2 mt-2">Data</span>
      </div>
    </div>
    <div class="col-md-7"></div>
    <div class="col-md-3 mt-3">
      <div class="input-group">
        <label for="search" class="form-label mt-2 me-2">Cari: </label>
        <input type="text" class="form-control" placeholder="Masukkan kata kunci ...">
        <button class="btn btn-light">
          <i class="bx bx-search"></i>
        </button>
      </div>
    </div>

  </div>
</template>