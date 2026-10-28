<script setup lang="ts">
useHead({ title: '商品管理' })

const keyword = ref('')
const { data: items, refresh, pending } = await useFetch('/api/items', {
  query: { keyword },
  watch: [keyword],
})

async function remove(id: string, name: string) {
  if (!confirm(`确定删除「${name}」吗？`)) return
  try {
    await $fetch(`/api/items/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (e: any) {
    alert(e?.data?.message || '删除失败')
  }
}
</script>

<template>
  <div>
    <div class="page-head">
      <h1>商品管理</h1>
      <NuxtLink to="/items/new" class="btn btn-primary">+ 新增商品</NuxtLink>
    </div>

    <input v-model.trim="keyword" class="search" placeholder="按名称或描述搜索…">

    <div class="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>价格</th>
            <th>库存</th>
            <th>描述</th>
            <th>更新时间</th>
            <th class="right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>¥{{ item.price.toFixed(2) }}</td>
            <td>{{ item.stock }}</td>
            <td class="muted ellipsis">{{ item.description || '—' }}</td>
            <td class="muted">{{ new Date(item.updatedAt).toLocaleString() }}</td>
            <td class="right nowrap">
              <NuxtLink :to="`/items/${item.id}`" class="btn btn-ghost btn-sm">编辑</NuxtLink>
              <button class="btn btn-danger btn-sm" @click="remove(item.id, item.name)">删除</button>
            </td>
          </tr>
          <tr v-if="!pending && !items?.length">
            <td colspan="6" class="empty">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
