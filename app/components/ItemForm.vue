<script setup lang="ts">
export interface ItemInput {
  name: string
  price: number
  stock: number
  description: string
}

const props = defineProps<{ initial?: Partial<ItemInput>, submitText?: string }>()
const emit = defineEmits<{ submit: [value: ItemInput] }>()

const form = reactive<ItemInput>({
  name: props.initial?.name ?? '',
  price: props.initial?.price ?? 0,
  stock: props.initial?.stock ?? 0,
  description: props.initial?.description ?? '',
})
</script>

<template>
  <form class="card form" @submit.prevent="emit('submit', { ...form })">
    <label>
      名称 *
      <input v-model.trim="form.name" required maxlength="50">
    </label>
    <div class="row">
      <label>
        价格 (¥) *
        <input v-model.number="form.price" type="number" min="0" step="0.01" required>
      </label>
      <label>
        库存 *
        <input v-model.number="form.stock" type="number" min="0" step="1" required>
      </label>
    </div>
    <label>
      描述
      <textarea v-model="form.description" rows="4" maxlength="500" />
    </label>
    <slot />
    <div class="actions">
      <NuxtLink to="/items" class="btn btn-ghost">取消</NuxtLink>
      <button class="btn btn-primary">{{ submitText ?? '保存' }}</button>
    </div>
  </form>
</template>
