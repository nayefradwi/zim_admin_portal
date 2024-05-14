<script lang="ts">
  import type { ProductVariant } from "../../../data";
  export let productVariant: ProductVariant;
</script>

<div class="flex flex-row space-x-4">
  <div class="card bg-base-100 shadow p-4">
    <div class="card-title font-semibold text-lg">
      Product Variant Dimensions
    </div>
    <div class="card-body flex-col items-start p-0 text-left">
      width: {productVariant.width ?? 0} cm
      <br />
      height: {productVariant.height ?? 0} cm
      <br />
      depth: {productVariant.depth ?? 0} cm
      <br />
      weight: {productVariant.weight ?? 0} g
    </div>
  </div>
  <div class="card bg-base-100 shadow p-4">
    <div class="card-title font-semibold text-lg">Product Variant Pricing</div>
    <div class="card-body flex-col items-start p-0 text-left">
      Price: {productVariant.price} QR
      <br />
      Recipe Cost: {productVariant.totalCost ?? 0} QR
    </div>
  </div>
  <div class="card bg-base-100 shadow p-4">
    <div class="card-title font-semibold text-lg">Product Variant Details</div>
    <div class="card-body flex-col items-start p-0 text-left">
      is default: {productVariant.isDefault ? "Yes" : "No"}
      <br />
      is archived: {productVariant.isArchived ? "Yes" : "No"}
      <br />
      unit: {productVariant.standardUnit?.name}
      <br />
      expires in: {productVariant.expiresInDays ?? 0} days
    </div>
  </div>
</div>
