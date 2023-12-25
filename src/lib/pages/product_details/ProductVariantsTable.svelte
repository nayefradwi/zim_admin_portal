<script lang="ts">
  import {
    ProductRepo,
    type Product,
    type ProductVariant,
    type ResponseHandlerData,
    getResponse,
  } from "../../../data";
  import ApiConfirmationDialog from "../../components/ApiConfirmationDialog.svelte";
  import { batchStore, productStore } from "../../stores/pagination";
  import ProductVariantTableRow from "./ProductVariantTableRow.svelte";
  import UpdateProductVariantDetails from "./UpdateProductVariantDetails.svelte";
  import UpdateProductVariantSkuModel from "./UpdateProductVariantSkuModel.svelte";
  export let product: Product;
  export let productVariants: ProductVariant[];
  let showUpdateSkuModal: boolean = false;
  let showUpdateVariantModal: boolean = false;
  let currentSku: string = "";
  let currentVariant: ProductVariant | undefined = undefined;
  let title: string = "";
  let message: string = "";
  let showConfirmationDialog: boolean = false;
  let onConfirm: () => Promise<any> = async () => {};
  function onUpdateSkuClicked(sku: string) {
    currentSku = sku;
    showUpdateSkuModal = true;
  }

  function onUpdateVariantClicked(variant: ProductVariant) {
    currentVariant = variant;
    showUpdateVariantModal = true;
  }

  function onArchiveVariantClicked(variant: ProductVariant) {
    title = "Archive Variant?";
    message = "Are you sure you want to archive this variant?";
    onConfirm = () => archiveVariant(variant);
    showConfirmationDialog = true;
  }

  function onUnarchiveVariantClicked(variant: ProductVariant) {
    title = "Unarchive Variant?";
    message = "Are you sure you want to unarchive this variant?";
    onConfirm = () => unarchiveVariant(variant);
    showConfirmationDialog = true;
  }

  function onVariantDeleted(variant: ProductVariant) {
    title = "Delete Variant?";
    message =
      "Deleting this variant will delete all corresponding batches, retailer batches and recipes. Are you sure you want to delete this variant?";
    onConfirm = () => deleteVariant(variant);
    showConfirmationDialog = true;
  }

  function onUpdateSkuSuccessfully() {
    showUpdateSkuModal = false;
    refreshProduct();
  }

  function onUpdateVariantSuccessfully() {
    showUpdateVariantModal = false;
    refreshProduct();
  }

  async function archiveVariant(variant: ProductVariant): Promise<void> {
    const details: ResponseHandlerData<void> = {
      call: () => ProductRepo.archiveProductVariant(variant.id.toString()),
      onSuccess: refreshProduct,
    };
    return getResponse<void>(details);
  }
  async function unarchiveVariant(variant: ProductVariant): Promise<void> {
    const details: ResponseHandlerData<void> = {
      call: () => ProductRepo.unarchiveProductVariant(variant.id.toString()),
      onSuccess: refreshProduct,
    };
    return getResponse<void>(details);
  }
  async function deleteVariant(variant: ProductVariant): Promise<void> {
    const details: ResponseHandlerData<void> = {
      call: () => ProductRepo.deleteProductVariant(variant.id.toString()),
      onSuccess: () => {
        refreshProduct();
        productStore.refresh($productStore);
        batchStore.refresh($batchStore);
      },
    };
    return getResponse<void>(details);
  }

  function refreshProduct() {
    const details: ResponseHandlerData<Product> = {
      call: () => ProductRepo.getProduct(product.id.toString()),
      onSuccess(data) {
        product = data;
      },
    };
    getResponse<Product>(details);
  }
</script>

<UpdateProductVariantSkuModel
  bind:showModal={showUpdateSkuModal}
  onSuccessCallback={onUpdateSkuSuccessfully}
  bind:currentSku
/>
<UpdateProductVariantDetails
  bind:showModal={showUpdateVariantModal}
  onSuccessCallback={onUpdateVariantSuccessfully}
  bind:productVariant={currentVariant}
/>
<ApiConfirmationDialog
  {title}
  {message}
  {onConfirm}
  onCancel={() => {}}
  bind:showModal={showConfirmationDialog}
/>
<table class="table table-xs">
  <thead>
    <tr>
      <th>Id</th>
      <th>Sku</th>
      <th>Name</th>
      <th>Price</th>
      <th>Details</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#if productVariants && productVariants.length > 0}
      {#each productVariants as variant}
        <ProductVariantTableRow
          {variant}
          {onUpdateSkuClicked}
          {onUpdateVariantClicked}
          {onArchiveVariantClicked}
          {onUnarchiveVariantClicked}
          {onVariantDeleted}
        />
      {/each}
    {/if}
  </tbody>
</table>
