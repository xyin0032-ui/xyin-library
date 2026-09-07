<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4">
          <h2 class="text-center mb-4">
            Firebase Sign In
          </h2>

          <form @submit.prevent="signInUser">
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
              Sign In
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
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

const email = ref('')
const password = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Current user:', user)
    console.log('Current user email:', user.email)
  } else {
    console.log('Current user: No user signed in')
  }
})

const signInUser = () => {
  signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )
    .then((userCredential) => {
      const user = userCredential.user

      console.log('Signed in user:', user)
      console.log('Current user:', auth.currentUser)

      successMessage.value = 'Sign in successful!'
      errorMessage.value = ''
    })
    .catch((error) => {
      console.log('Sign in error:', error.code)
      console.log(error.message)

      errorMessage.value = error.code
      successMessage.value = ''
    })
}
</script>