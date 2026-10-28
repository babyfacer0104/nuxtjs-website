<script setup lang="ts">
const { user, logout } = useAuth()
</script>

<template>
  <div class="shell">
    <header class="topbar">
      <NuxtLink to="/" class="brand">Nuxt 管理后台</NuxtLink>
      <nav>
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/items">商品管理</NuxtLink>
      </nav>
      <div class="user">
        <span>{{ user?.username }}</span>
        <button class="btn btn-ghost" @click="logout">退出</button>
      </div>
    </header>
    <main class="container">
      <slot />
    </main>
  </div>
</template>
