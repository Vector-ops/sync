<template>
  <div>
    <Header
      @btn-click="editNote"
      :title="note.title"
      :color="color"
      newNote="Edit"
    />
    <router-link to="/">Home</router-link>
    <AddNote
      @update-note="recieveNote"
      :note="this.note"
      :btnClick="btnClick"
    />
  </div>
</template>
<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import AddNote from "@/components/AddNote.vue";
export default {
  name: "SingleNotePage",
  components: {
    Header,
    AddNote,
  },
  data() {
    return {
      note: {},
      color: "#2c3e50",
      updatedNote: {},
      btnClick: false,
    };
  },
  methods: {
    editNote() {
      console.log({ slp: this.btnClick });
      this.btnClick = !this.btnClick;
      this.updateNote();
    },
    async getNote(id) {
      const res = await axios.get(`http://localhost:3000/api/v1/notes/${id}`);
      return res.data.notes;
    },
    recieveNote(updatedNote) {
      this.updatedNote.title = updatedNote.title
        ? updatedNote.title
        : this.note.title;
      this.updatedNote.body = updatedNote.body
        ? updatedNote.body
        : this.note.body;
    },
    async updateNote() {
      const res = await axios.put(
        `http://localhost:3000/api/v1/notes/${this.note._id}`,
        this.updatedNote
      );
      this.note = res.data.notes;
    },
  },
  async created() {
    this.note = await this.getNote(this.$route.params.noteId);
  },
};
</script>
