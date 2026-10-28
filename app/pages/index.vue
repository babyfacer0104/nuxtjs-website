<script setup lang="ts">
useHead({ title: '首页' })
const { user } = useAuth()
const { data: items } = await useFetch('/api/items')

const totalStock = computed(() => (items.value ?? []).reduce((sum, i) => sum + i.stock, 0))
const totalValue = computed(() => (items.value ?? []).reduce((sum, i) => sum + i.price * i.stock, 0))
</script>

<template>
  <div>
    <h1>你好，{{ user?.username }} 👋</h1>
    <p class="muted">这里是数据概览。</p>
    <div class="stats">
      <div class="card stat">
        <span class="muted">商品数</span>
        <strong>{{ items?.length ?? 0 }}</strong>
      </div>
      <div class="card stat">
        <span class="muted">总库存</span>
        <strong>{{ totalStock }}</strong>
      </div>
      <div class="card stat">
        <span class="muted">库存总值</span>
        <strong>¥{{ totalValue.toFixed(2) }}</strong>
      </div>
    </div>
    <NuxtLink to="/items" class="btn btn-primary">进入商品管理 →</NuxtLink>
  </div>
</template>
