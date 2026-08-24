<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-sm-10 offset-sm-1">

        <!-- Header -->
        <div class="text-center mb-4">
          <h1>W5. Library Registration Form</h1>
          <p>
            Let's build some more advanced features into our form.
          </p>
        </div>

        <form @submit.prevent="submitForm">

          <!-- Username and Gender -->
          <div class="row mb-3">

            <!-- Username -->
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">
                Username
              </label>

              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="validateUsername(true)"
                @input="validateUsername(false)"
              />

              <div
                v-if="errors.username"
                class="text-danger"
              >
                {{ errors.username }}
              </div>
            </div>

            <!-- Gender -->
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">
                Gender
              </label>

              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
                @blur="validateGender"
              >
                <option value="" disabled>
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <div
                v-if="errors.gender"
                class="text-danger"
              >
                {{ errors.gender }}
              </div>
            </div>

          </div>

          <!-- Password and Confirm Password -->
          <div class="row mb-3">

            <!-- Password -->
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">
                Password
              </label>

              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="validatePassword(true)"
                @input="validatePassword(false)"
              />

              <div
                v-if="errors.password"
                class="text-danger"
              >
                {{ errors.password }}
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="col-md-6 col-sm-6">
              <label
                for="confirm-password"
                class="form-label"
              >
                Confirm password
              </label>

              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="validateConfirmPassword"
              />

              <div
                v-if="errors.confirmPassword"
                class="text-danger"
              >
                {{ errors.confirmPassword }}
              </div>
            </div>

          </div>

          <!-- Australian Resident -->
          <div class="row mb-3">
            <div class="col-12">

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="resident"
                  v-model="formData.isAustralian"
                />

                <label
                  class="form-check-label"
                  for="resident"
                >
                  Australian Resident?
                </label>
              </div>

            </div>
          </div>

          <!-- Suburb -->
          <div class="row mb-3">
            <div class="col-12">

              <label
                for="suburb"
                class="form-label"
              >
                Suburb
              </label>

              <input
                type="text"
                class="form-control"
                id="suburb"
                v-bind:value="formData.suburb"
              />

            </div>
          </div>

          <!-- Reason for Joining -->
          <div class="row mb-3">
            <div class="col-12">

              <label
                for="reason"
                class="form-label"
              >
                Reason for joining
              </label>

              <textarea
                class="form-control"
                id="reason"
                rows="4"
                v-model="formData.reason"
                @blur="validateReason(true)"
                @input="handleReasonInput"
              ></textarea>

              <!-- Reason Error -->
              <div
                v-if="errors.reason"
                class="text-danger"
              >
                {{ errors.reason }}
              </div>

              <!-- Friend Message -->
              <div
                v-if="reasonMessage"
                class="text-success"
              >
                {{ reasonMessage }}
              </div>

            </div>
          </div>

          <!-- Buttons -->
          <div class="text-center mt-4">

            <button
              type="submit"
              class="btn btn-primary me-2"
            >
              Submit
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              @click="clearForm"
            >
              Clear
            </button>

          </div>

        </form>

        <!-- Submitted Information -->
        <div
          v-for="(card, index) in submittedCards"
          :key="index"
          class="card mt-4"
        >
          <div class="card-body">

            <h5 class="card-title">
              Registration Information
            </h5>

            <p>
              <strong>Username:</strong>
              {{ card.username }}
            </p>

            <p>
              <strong>Gender:</strong>
              {{ card.gender }}
            </p>

            <p>
              <strong>Australian Resident:</strong>
              {{ card.isAustralian ? 'Yes' : 'No' }}
            </p>

            <p>
              <strong>Suburb:</strong>
              {{ card.suburb }}
            </p>

            <p>
              <strong>Reason for joining:</strong>
              {{ card.reason }}
            </p>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  gender: null,
  reason: null
})

const reasonMessage = ref('')

const submittedCards = ref([])

/* Username Validation */
const validateUsername = (blur) => {
  const username = formData.value.username.trim()

  if (username.length < 3) {
    if (blur) {
      errors.value.username =
        'Username must be at least 3 characters'
    }
  } else {
    errors.value.username = null
  }
}

/* Password Validation */
const validatePassword = (blur) => {
  const password = formData.value.password

  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialCharacter =
    /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < 8) {
    if (blur) {
      errors.value.password =
        'Password must be at least 8 characters'
    }
  } else if (!hasUppercase) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one uppercase letter'
    }
  } else if (!hasLowercase) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one lowercase letter'
    }
  } else if (!hasNumber) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one number'
    }
  } else if (!hasSpecialCharacter) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one special character'
    }
  } else {
    errors.value.password = null
  }
}

/* Confirm Password Validation */
const validateConfirmPassword = () => {
  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword =
      'Please confirm your password'
  } else if (
    formData.value.confirmPassword !==
    formData.value.password
  ) {
    errors.value.confirmPassword =
      'Passwords do not match'
  } else {
    errors.value.confirmPassword = null
  }
}

/* Gender Validation */
const validateGender = () => {
  if (!formData.value.gender) {
    errors.value.gender =
      'Please select a gender'
  } else {
    errors.value.gender = null
  }
}

/* Reason Validation */
const validateReason = (blur) => {
  const reason = formData.value.reason.trim()

  if (reason.length < 10) {
    if (blur) {
      errors.value.reason =
        'Reason must be at least 10 characters'
    }
  } else {
    errors.value.reason = null
  }
}

/* Check for friend */
const checkReason = () => {
  const reason = formData.value.reason.toLowerCase()

  if (reason.includes('friend')) {
    reasonMessage.value =
      'Great to have a friend'
  } else {
    reasonMessage.value = ''
  }
}

/* Handle Reason Input */
const handleReasonInput = () => {
  checkReason()
  validateReason(false)
}

/* Submit Form */
const submitForm = () => {
  validateUsername(true)
  validatePassword(true)
  validateConfirmPassword()
  validateGender()
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    submittedCards.value.push({
      username: formData.value.username,
      gender: formData.value.gender,
      isAustralian: formData.value.isAustralian,
      suburb: formData.value.suburb,
      reason: formData.value.reason
    })

    clearForm()
  }
}

/* Clear Form */
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
  }

  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    gender: null,
    reason: null
  }

  reasonMessage.value = ''
}
</script>

<style scoped>
.container {
  max-width: 1100px;
}

.text-danger {
  margin-top: 5px;
}

.text-success {
  margin-top: 5px;
}

textarea {
  resize: vertical;
}
</style>