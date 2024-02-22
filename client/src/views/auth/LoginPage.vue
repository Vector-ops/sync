<template>
	<div className="app__login">
		<form
			className="app__login-form"
			autoComplete="off"
			@submit.prevent="submit"
		>
			<h1>Welcome Back!</h1>
			<div className="app__login-form-input">
				<input
					type="text"
					placeholder="Username"
					required
					v-model="loginData.username"
				/>
				<input
					type="password"
					placeholder="Password"
					required
					v-model="loginData.password"
				/>
				<p className="error" v-if="errorMessage">{{ errorMessage }}</p>
			</div>
			<button type="submit" @click="submit()">Login</button>
		</form>
	</div>
</template>
<script>
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

export default {
	name: "LoginPage",

	setup() {
		const loginData = reactive({
			username: "",
			password: "",
		});

		const errorMessage = ref("");
		return { loginData, errorMessage };
	},

	methods: {
		async submit() {
			console.log("Entered");
			await axios
				.post("http://localhost:3000/api/v1/auth/login", {
					username: this.loginData.username,
					password: this.loginData.password,
				})
				.then((res) => {
					console.log(res);
					// localStorage.setItem("user", res.data);
					router.push({ name: "home" });
				})
				.catch((err) => {
					console.log(err);
					this.errorMessage = err.response.data.message;
				});
		},
	},
};
</script>

<style scoped>
.app__login {
	font-family: "Syne", sans-serif;
	font-weight: 400;
	background-size: 100vw auto;
	background-repeat: no-repeat;
	background-position: left;
	background-attachment: fixed;
	width: 100vw;
	height: 100vh;
	color: #2c3e50;

	font-size: larger;
	position: fixed;
}
.app__login-form {
	width: 28em;
	height: 38em;

	background-color: #ffffff;
	border-radius: 20px;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	position: absolute;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 2em;
	align-items: center;
	border: 2px solid #3d3c3c;
	padding-top: 100px;
}
.app__login-form-input {
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;

	margin-top: 4em;
}

input {
	background-color: #ffffff;
	color: #3d3c3c;

	width: 420px;
	height: 50px;
	border-radius: 15px;

	padding: 20px;

	font-size: large;
	font-family: "Syne", sans-serif;
	outline: none;
}
button {
	height: 50px;
	width: 420px;

	border-radius: 15px;
	border: none;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	font-weight: 500;
	font-size: large;
	background-color: #2c3e50;
	color: lightgray;

	margin-top: 2em;
}

.error {
	color: red;
	font-size: smaller;
}
</style>
