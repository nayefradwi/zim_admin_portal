<script lang="ts">
    export let placeholder: string | undefined = "";
    export let type: "email" | "password" | "text" | "number" | undefined =
        "text";
    export let inputColor: "input-primary" | "input-secondary" | undefined =
        "input-primary";
    export let size: "input-sm" | "input-lg" | "input-xs" | "" | undefined = "";
    export let isFilled: boolean | undefined = false;
</script>

<input
    {type}
    {placeholder}
    class="input {isFilled
        ? inputColor
        : null} [&:not(:focus)]:input-bordered w-full focus:{inputColor} focus:border-0 {size}"
/>
