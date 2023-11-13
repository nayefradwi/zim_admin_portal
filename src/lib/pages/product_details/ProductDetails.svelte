<script lang="ts">
    import type { Product } from "../../../data";
    import ProductOptions from "./productOptions.svelte";
    import ProductDescription from "./ProductDescription.svelte";
    import ProductAppBar from "./ProductAppBar.svelte";
    import ProductVariantsView from "./ProductVariantsView.svelte";
    export let productId: string;
    const fakeProduct: Product = {
        id: 1,
        name: "Test Product",
        description: "This is a test product",
        image: "https://picsum.photos/200",
        isArchived: false,
        options: {
            flavor: {
                id: 4,
                name: "flavor",
                values: [
                    {
                        id: 7,
                        value: "pistachio",
                    },
                    {
                        id: 8,
                        value: "almond",
                    },
                ],
            },
            weight: {
                id: 3,
                name: "weight",
                values: [
                    {
                        id: 5,
                        value: "250g",
                    },
                    {
                        id: 6,
                        value: "500g",
                    },
                ],
            },
        },
        variants: [
            {
                id: 1,
                productId: 1,
                name: "Test Variant",
                sku: "123",
                image: "https://picsum.photos/200",
                price: 100,
            },
        ],
    };
</script>

<main
    class="flex flex-col justify-start p-4 items-start h-screen overflow-hidden"
>
    <div class="card w-full shadow rounded p-2 h-full">
        <ProductAppBar
            name={fakeProduct.name}
            isArchived={fakeProduct.isArchived || false}
        />
        <ProductOptions productOptions={fakeProduct.options} />
        <ProductDescription
            productDescription={fakeProduct.description}
            productImage={fakeProduct.image}
        />

        <ProductVariantsView productVariants={fakeProduct.variants} />
    </div>
</main>
