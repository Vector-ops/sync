<template>
	<div class="container">
		<Header
			@btn-click="toggleAddNewNote()"
			:title="'Sync'"
			:newNote="btnName"
			:color="this.color"
		/>
		<div
			class="multi-note"
			:style="
				!this.toggleNewNote ? '' : 'display: flex; flex-direction:row;'
			"
		>
			<div class="notes-container">
				<Notes @note-click="showSingleNote" :notes="this.notes" />
			</div>
			<AddNote
				@update-note="recieveNewNote"
				v-show="this.toggleNewNote"
			/>
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
			try {
				const res = await axios.get(
					"http://localhost:3000/api/v1/notes"
				);
				return res.data.notes;
			} catch (error) {
				if (error.response.status === 401)
					return this.$router.push({ name: "login" });
				else console.log(error);
			}
		},
		recieveNewNote(newNote) {
			this.newNote = newNote;
		},
		async addNewNote() {
			if (this.saveNote) {
				try {
					const res = await axios.post(
						"http://localhost:3000/api/v1/notes",
						this.newNote
					);
					this.notes.push(res.data.notes);
					this.saveNote = false;
				} catch (error) {
					if (error.response.status === 401)
						return this.$router.push({ name: "login" });
					else console.log(error);
				}
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
