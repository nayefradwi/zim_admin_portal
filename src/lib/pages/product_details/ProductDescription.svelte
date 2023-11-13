<script lang="ts">
    export let productDescription: string | undefined;
    export let productImage: string | undefined;
</script>

<div class="flex flex-row items-start my-2">
    <!-- TODO make image clickable to update image or upload image -->
    <img
        src={productImage || "https://placehold.co/100"}
        alt={productDescription}
        width="100"
        height="100"
        class="rounded-sm mr-4"
    />
    <div class="w-full text-left rounded-sm font-light">
        {#if productDescription}
            <p>{productDescription}</p>
        {:else}
            <p>no description</p>
        {/if}
    </div>
</div>
