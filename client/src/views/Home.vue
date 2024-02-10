<template>
  <div class="container">
    <Header
      @btn-click="toggleAddNewNote()"
      :title="'NoteStack'"
      :newNote="btnName"
      :color="this.color"
    />
    <div
      class="multi-note"
      :style="!this.toggleNewNote ? '' : 'display: flex; flex-direction:row;'"
    >
      <div class="notes-container">
        <Notes @note-click="showSingleNote" :notes="this.notes" />
      </div>
      <AddNote @update-note="recieveNewNote" v-show="this.toggleNewNote" />
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Header from "../components/Header.vue";
import Notes from "../components/Notes.vue";
import AddNote from "../components/AddNote.vue";
export default {
  name: "Home",
  components: {
    Header,
    Notes,
    AddNote,
  },
  data() {
    return {
      notes: [],
      newNote: {},
      btnName: "New Note",
      color: "#2c3e50",
      toggleNewNote: false,
      saveNote: false,
    };
  },
  methods: {
    toggleAddNewNote() {
      this.toggleNewNote = !this.toggleNewNote;
      if (this.toggleNewNote) {
        this.btnName = "Save";
        this.color = "green";
      } else {
        this.btnName = "New Note";
        this.color = "#2c3e50";
        this.saveNote = true;
        this.addNewNote();
      }
    },
    showSingleNote(id) {
      this.$router.push({
        name: "note",
        params: { noteId: id },
      });
    },
    async fetchNotes() {
      const res = await axios.get("http://localhost:3000/api/v1/notes");
      return res.data.notes;
    },
    recieveNewNote(newNote) {
      this.newNote = newNote;
    },
    async addNewNote() {
      if (this.saveNote) {
        const res = await axios.post(
          "http://localhost:3000/api/v1/notes",
          this.newNote
        );
        this.notes.push(res.data.notes);
        this.saveNote = false;
      }
    },
  },
  async created() {
    this.notes = await this.fetchNotes();
  },
};
</script>

<style scoped>
.container {
  background: lightgray;
}
.notes-container {
  max-height: 80.6dvh;
  overflow-y: scroll;
  min-width: 50vw;
}

.container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.container::-webkit-scrollbar {
  display: none;
}
</style>
