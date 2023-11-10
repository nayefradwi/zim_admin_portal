<script lang="ts">
    export let placeholder: string | undefined = "";
    export let type: "email" | "password" | "text" = "text";
    export let inputColor: "input-primary" | "input-secondary" =
        "input-primary";
    export let size: "input-sm" | "input-lg" | "input-xs" | "" | undefined = "";
    export let isFilled: boolean | undefined = false;
    export let errorMessage: string | undefined = undefined;
    export let value: string | undefined = undefined;

    function getColor(): string | null {
        if (!!errorMessage) return "input-error";
        if (isFilled) return inputColor;
        return null;
    }

    function typeAction(node: any) {
        node.type = type;
    }
</script>

<div class="form-control w-full max-w-s">
    <input
        bind:value
        use:typeAction
        {placeholder}
        class="input {getColor()} [&:not(:focus)]:input-bordered w-full focus:{inputColor} focus:border-0 {size}"
    />
    {#if errorMessage}
        <span class="label">
            <span class="label-text-alt text-error">{errorMessage}</span>
        </span>
    {/if}
</div>
