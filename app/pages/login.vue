<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: '登录' })

const route = useRoute()
const { login } = useAuth()
const form = reactive({ username: 'admin', password: '' })
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await login(form.username, form.password)
    const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/') ? route.query.redirect : '/'
    await navigateTo(redirect)
  } catch (e: any) {
    error.value = e?.data?.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <form class="card login-card" @submit.prevent="onSubmit">
      <h1>欢迎登录</h1>
      <p class="muted">演示账号: admin / 123456</p>
      <label>
        用户名
        <input v-model="form.username" autocomplete="username" required>
      </label>
      <label>
        密码
        <input v-model="form.password" type="password" autocomplete="current-password" required>
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <button class="btn btn-primary" :disabled="loading">{{ loading ? '登录中…' : '登录' }}</button>
    </form>
  </div>
</template>
