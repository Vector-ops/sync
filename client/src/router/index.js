import PageNotFound from "@/views/PageNotFound.vue";
import SingleNotePage from "@/views/SingleNotePage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/login",
		name: "login",
		component: LoginPage,
	},
	{
		path: "/note/:noteId",
		name: "note",
		component: SingleNotePage,
	},
	{
		path: "/:catchAll(.*)*",
		name: "PageNotFound",
		component: PageNotFound,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
