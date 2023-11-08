<script>
    import PrimaryButton from "../../components/PrimaryButton.svelte";
    import PrimaryInput from "../../components/PrimaryInput.svelte";
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
            <p class="text-gray-500">
                Please enter your email and password to login
            </p>
        </div>
        <div class="p-2" />
        <PrimaryInput placeholder="email" type="email" />
        <div class="p-1" />
        <PrimaryInput placeholder="password" type="password" />
        <div class="p-1" />
        <PrimaryButton label="Login" />
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
