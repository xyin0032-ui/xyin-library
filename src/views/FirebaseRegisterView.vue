<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4">
          <h2 class="text-center mb-4">
            Firebase Registration
          </h2>

          <form @submit.prevent="registerUser">
            <div class="mb-3">
              <label
                for="email"
                class="form-label"
              >
                Email
              </label>

              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Enter your email"
                required
              >
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
                placeholder="Enter your password"
                required
              >
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
            >
              Register
            </button>
          </form>

          <div
            v-if="successMessage"
            class="alert alert-success mt-3"
          >
            {{ successMessage }}
          </div>

          <div
            v-if="errorMessage"
            class="alert alert-danger mt-3"
          >
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth'

const email = ref('')
const password = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const registerUser = () => {
  const auth = getAuth()

  createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )
    .then((userCredential) => {
      const user = userCredential.user

      console.log('Registered user:', user)
      console.log('Current user:', auth.currentUser)

      successMessage.value =
        'Registration successful!'

      errorMessage.value = ''
    })
    .catch((error) => {
      console.log('Registration error:', error.code)
      console.log(error.message)

      errorMessage.value = error.code
      successMessage.value = ''
    })
}
</script>