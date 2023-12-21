<script lang="ts">
  import toast from "svelte-french-toast";
  export let showModal: boolean;

  export let onSuccessfulCreation: () => void;

  $: if (dialog && showModal) dialog.showModal();

  let isLoading: boolean = false;
  let dialog: HTMLDialogElement;

  function onSuccess() {
    isLoading = false;
    showModal = false;
    dialog.close();
    toast.success("Batch modified");
    onSuccessfulCreation();
  }
</script>

<dialog
  bind:this={dialog}
  on:close={() => {
    if (isLoading) return;
    showModal = false;
  }}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Add Product</h1>

    <div class="space-y-4">
      <input placeholder="Name" class="input input-bordered input-sm w-full" />

      <input placeholder="Price" class="input input-bordered input-sm w-full" />

      <input
        placeholder="Expires in days"
        class="input input-bordered input-sm w-full"
      />

      <select class="select select-bordered w-full">
        <option>grams</option>
        <option>liters</option>
      </select>

      <input
        placeholder="Options"
        class="input input-bordered input-sm w-full"
      />
    </div>

    <div class="modal-action mt-6">
      <button class="btn btn-primary">Create product</button>
      <form method="dialog">
        <button class="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
