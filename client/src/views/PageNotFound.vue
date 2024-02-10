<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>This page no longer exists or was moved to another location.</p>
    <router-link class="home" to="/">Home</router-link>
  </div>
</template>
<style scoped>
.home {
  text-decoration: underline;
  color: #2c3e50;
}
div {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
