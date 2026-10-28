<script setup lang="ts">
import type { ItemInput } from '~/components/ItemForm.vue'

useHead({ title: '编辑商品' })
const id = useRoute().params.id as string
const { data: item, error: loadError } = await useFetch(`/api/items/${id}`)
const error = ref('')

async function update(value: ItemInput) {
  error.value = ''
  try {
    await $fetch(`/api/items/${id}`, { method: 'PUT', body: value })
    await navigateTo('/items')
  } catch (e: any) {
    error.value = e?.data?.message || '保存失败'
  }
}
</script>

<template>
  <div>
    <h1>编辑商品</h1>
    <p v-if="loadError" class="error">记录不存在或已被删除。<NuxtLink to="/items">返回列表</NuxtLink></p>
    <ItemForm v-else-if="item" :initial="item" @submit="update">
      <p v-if="error" class="error">{{ error }}</p>
    </ItemForm>
  </div>
</template>
