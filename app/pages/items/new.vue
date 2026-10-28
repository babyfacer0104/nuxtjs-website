<script setup lang="ts">
import type { ItemInput } from '~/components/ItemForm.vue'

useHead({ title: '新增商品' })
const error = ref('')

async function create(value: ItemInput) {
  error.value = ''
  try {
    await $fetch('/api/items', { method: 'POST', body: value })
    await navigateTo('/items')
  } catch (e: any) {
    error.value = e?.data?.message || '保存失败'
  }
}
</script>

<template>
  <div>
    <h1>新增商品</h1>
    <ItemForm submit-text="创建" @submit="create">
      <p v-if="error" class="error">{{ error }}</p>
    </ItemForm>
  </div>
</template>
