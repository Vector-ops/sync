<template>
  <footer>
    <div class="github">
      <img src="../assets/github-mark.png" alt="" />
      <a href="https://github.com/Vector-ops" target="_blank">Visit Github</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  border-top: 3px solid gray;
  display: flex;
  flex-direction: column;
  bottom: 0;
  position: fixed;
  min-height: 10vh;
  min-width: 100%;
  gap: 1em;
  justify-content: center;
  background: lightgray;
}

.github {
  padding-right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 1.7em;
}

a {
  text-decoration: none;
}

a:link,
a:visited {
  color: #2c3e50;
}
</style>
