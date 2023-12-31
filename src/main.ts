import "./app.css";
import App from "./App.svelte";
import { setup } from "./setup";

const target = document.getElementById("app");
if (!target) throw new Error("Failed to find target element");

const url = await setup();
window.history.replaceState({}, "", url);
const app = new App({
  target,
  props: {
    url,
  },
});

export default app;
