<script lang="ts">
    import {
        ProductRepo,
        type Product,
        type ResponseHandlerData,
        getResponse,
    } from "../../../data";
    import ProductOptions from "./productOptions.svelte";
    import ProductDescription from "./ProductDescription.svelte";
    import ProductAppBar from "./ProductAppBar.svelte";
    import ProductVariantsView from "./ProductVariantsView.svelte";
    import { onMount } from "svelte";
    export let productId: string;
    let product: Product | undefined;
    const details: ResponseHandlerData<Product> = {
        call: () => ProductRepo.getProduct(productId),
        onSuccess(data) {
            product = data;
        },
        onError(error) {
            console.log(error);
        },
    };
    onMount(() => {
        getResponse<Product>(details);
    });
</script>

<main
    class="flex flex-col justify-start p-4 items-start h-screen overflow-hidden"
>
    <div class="card w-full shadow rounded p-2 h-full">
        {#if product}
            <ProductAppBar
                name={product.name}
                isArchived={product.isArchived || false}
            />
            <ProductOptions productOptions={product.options} />
            <ProductDescription
                productDescription={product.description}
                productImage={product.image}
            />

            <ProductVariantsView productVariants={product.productVariants} />
        {:else}
            <span
                class="loading loading-spinner loading-lg text-primary m-auto"
            />
        {/if}
    </div>
</main>
