<script lang="ts">
  import { navigate } from "svelte-routing";
  import PrimaryButton from "../../components/PrimaryButton.svelte";
  import PrimaryInput from "../../components/PrimaryInput.svelte";
  import { userStore } from "../../stores/user";
  import { onDestroy } from "svelte";
  import { WAREHOUSE_SELECT_ROUTE } from "../../routes";

  let email: string = "";
  let password: string = "";
  let emailError: string | undefined;
  let passwordError: string | undefined;

  function validateLogin(email: string, password: string): boolean {
    if (!email || email.length < 4) emailError = "Email is required";
    if (!password || password.length == 0)
      passwordError = "Password is required";
    return !emailError && !passwordError;
  }

  async function login() {
    emailError = undefined;
    passwordError = undefined;
    if (!validateLogin(email, password)) return;
    await userStore.loginUser(email, password);
    if (!$userStore) return;
    navigate(WAREHOUSE_SELECT_ROUTE);
  }
</script>

<main>
  <div class="side-bar">
    <div class="welcome-label">Welcome!</div>
    <div class="welcome-label">Zanobia Inventory Manager</div>
  </div>
  <div class="login-form">
    <div>
      <h1 class="text-3xl font-bold">Login</h1>
      <div class="p-1" />
      <p class="text-gray-500">Please enter your email and password to login</p>
    </div>
    <div class="p-2" />
    <PrimaryInput
      placeholder="email"
      type="email"
      bind:value={email}
      errorMessage={emailError}
    />
    <div class="p-1" />
    <PrimaryInput
      placeholder="password"
      type="password"
      bind:value={password}
      errorMessage={passwordError}
    />
    <div class="p-1" />
    <PrimaryButton label="Login" onClick={() => void login()} />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100vw;
    padding: 0;
    margin: 0;
  }
  .side-bar {
    background-color: var(--primary-color);
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .welcome-label {
    color: var(--light-color);
    font-size: 1.5rem;
    font-weight: 500;
  }

  .login-form {
    width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 15%;
  }
</style>
