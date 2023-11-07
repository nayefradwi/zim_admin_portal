<script>
    import PrimaryButton from "../../components/PrimaryButton.svelte";
</script>

<main>
    <PrimaryButton
        label="login"
        disabled={true}
        loading={true}
        onClick={() => {
            console.log("clicked");
        }}
    />
</main>

<style>
</style>
