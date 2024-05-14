<script lang="ts">
  import { navigate } from "svelte-routing";
  import { type Product } from "../../../../data";
  import { getProductDetailsRoute } from "../../../routes";

  export let product: Product;
  const goToProductDetails = () => {
    navigate(getProductDetailsRoute(product.id.toString()));
  };
</script>

<button
  class="card bg-base-100 shadow-md mx-1 my-4 cursor-pointer transition duration-300 hover:shadow-lg"
  on:click={goToProductDetails}
>
  <div class="card-body">
    <h2 class="card-title">{product.name}</h2>
    <p class="self-start font-light">
      {#if product.description}
        {product.description}
      {:else}
        No description
      {/if}
    </p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary btn-outline" on:click={goToProductDetails}>
        View Details
      </button>
    </div>
  </div>
</button>
