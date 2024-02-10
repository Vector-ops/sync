<template>
  <header>
    <h1>{{ title }}</h1>
    <Button @btn-click="$emit('btn-click')" :text="newNote" :color="color" />
  </header>
  <div class="line"></div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "Header",
  components: {
    Button,
  },
  props: {
    title: String,
    newNote: String,
    color: String,
  },
  emits: ["btn-click"],
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.1em;
}

h1 {
  font-size: 2.5em;
}

.line {
  border-bottom: 2px solid grey;
}
</style>
