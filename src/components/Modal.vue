
<template>
  <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: 'dinamyc-modal'
    }
  })
</script>