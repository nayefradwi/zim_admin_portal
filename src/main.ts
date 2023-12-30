import "./app.css";
import App from "./App.svelte";
import { setup } from "./setup";

const target = document.getElementById("app");
if (!target) throw new Error("Failed to find target element");

await setup();
const app = new App({
  target,
});

export default app;
