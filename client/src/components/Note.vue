<template>
  <div @click="$emit('note-click')">
    <h3>{{ note.title }}</h3>
    <p>{{ date }}</p>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    note: Object,
  },
  data() {
    return {
      date: "",
    };
  },
  created() {
    let rawDate = new Date(this.note.created_at);
    this.date = rawDate.toDateString();
  },
};
</script>
<style scoped>
div {
  margin: 0.5em 2em;
  height: 8em;
  color: whitesmoke;
  background: #2c3e50;
  padding: 1.2em;
  gap: 1em;
  align-items: start;
  border-radius: 1em;
  justify-content: space-between;
}
</style>
