<template>
  <div class="login-page">
    <h1 class="text-center mb-4">
      Member Login
    </h1>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label
          for="username"
          class="form-label"
        >
          Username
        </label>

        <input
          id="username"
          v-model="username"
          type="text"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label
          for="password"
          class="form-label"
        >
          Password
        </label>

        <input
          id="password"
          v-model="password"
          type="password"
          class="form-control"
        />
      </div>

      <div
        v-if="errorMessage"
        class="alert alert-danger"
      >
        {{ errorMessage }}
      </div>

      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const handleLogin = () => {
  const success = login(
    username.value,
    password.value
  )

  if (success) {
    errorMessage.value = ''
    router.push('/about')
  } else {
    errorMessage.value =
      'Invalid username or password'
  }
}
</script>

<style scoped>
.login-page {
  max-width: 500px;
  margin: 60px auto;
}
</style>