<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-sm-10 offset-sm-1">
        <h1 class="text-center mb-4">
          User Information Form
        </h1>

        <form @submit.prevent="submitForm">
          <!-- Username and Password -->
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="username" class="form-label">
                Username
              </label>

              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              >

              <div
                v-if="errors.username"
                class="text-danger"
              >
                {{ errors.username }}
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <label for="password" class="form-label">
                Password
              </label>

              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              >

              <div
                v-if="errors.password"
                class="text-danger"
              >
                {{ errors.password }}
              </div>
            </div>
          </div>

          <!-- Australian Resident and Gender -->
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <div class="form-check mt-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  @change="() => validateResident(false)"
                  @blur="() => validateResident(true)"
                >

                <label
                  class="form-check-label"
                  for="isAustralian"
                >
                  Australian Resident?
                </label>
              </div>

              <div
                v-if="errors.resident"
                class="text-danger"
              >
                {{ errors.resident }}
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <label for="gender" class="form-label">
                Gender
              </label>

              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @change="() => validateGender(false)"
                @blur="() => validateGender(true)"
              >
                <option value="" disabled>
                  Please select
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

                <option value="other">
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

          <!-- Reason for joining -->
          <div class="mb-3">
            <label for="reason" class="form-label">
              Reason for joining
            </label>

            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>

            <div
              v-if="errors.reason"
              class="text-danger"
            >
              {{ errors.reason }}
            </div>
          </div>

          <!-- Buttons -->
          <div class="text-center mb-5">
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

        <!-- PrimeVue DataTable -->
        <DataTable
          v-if="submittedCards.length"
          :value="submittedCards"
          tableStyle="min-width: 50rem"
        >
          <Column
            field="username"
            header="Username"
          />

          <Column
            field="password"
            header="Password"
          />

          <Column
            field="isAustralian"
            header="Australian Resident"
          />

          <Column
            field="gender"
            header="Gender"
          />

          <Column
            field="reason"
            header="Reason"
          />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: ''
})

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null
})

const submittedCards = ref([])

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) {
      errors.value.username =
        'Name must be at least 3 characters'
    }
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8

  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar =
    /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
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
  } else if (!hasSpecialChar) {
    if (blur) {
      errors.value.password =
        'Password must contain at least one special character'
    }
  } else {
    errors.value.password = null
  }
}

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) {
      errors.value.resident =
        'Please confirm Australian resident status'
    }
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) {
      errors.value.gender =
        'Please select your gender'
    }
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.trim().length < 10) {
    if (blur) {
      errors.value.reason =
        'Reason must be at least 10 characters'
    }
  } else {
    errors.value.reason = null
  }
}

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    submittedCards.value.push({
      ...formData.value
    })
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    gender: '',
    reason: ''
  }

  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
  }
}
</script>

<style scoped>
.text-danger {
  margin-top: 4px;
  font-size: 0.9rem;
}
</style>