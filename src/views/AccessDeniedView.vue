<template>
  <div class="access-denied text-center">
    <h1>Access Denied</h1>

    <p>
      You must be logged in to access this page.
    </p>

    <router-link
      to="/login"
      class="btn btn-primary"
    >
      Go to Login
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.access-denied {
  margin-top: 60px;
}
</style>