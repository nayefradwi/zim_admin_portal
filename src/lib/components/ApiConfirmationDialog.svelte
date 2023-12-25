<script lang="ts">
  import toast from "svelte-french-toast";

  export let onConfirm: () => Promise<any>;
  export let onCancel: () => void;
  export let onClose: () => void = () => {};
  export let title: string;
  export let showModal: boolean;
  export let message: string = "Are you sure you want to perform this action?";
  export let confirmText: string = "Confirm";
  export let cancelText: string = "Cancel";
  let isLoading = false;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();

  function confirm() {
    if (isLoading) return;
    isLoading = true;
    onConfirm()
      .then(() => {
        isLoading = false;
        _onClose();
      })
      .catch((error) => {
        isLoading = false;
        toast.error(error.message);
      });
  }
  function cancel(e: Event) {
    e.preventDefault();
    if (isLoading) return;
    onCancel();
    _onClose();
  }

  function _onClose(): void {
    if (isLoading) return;
    showModal = false;
    onClose();
    dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">
      {title}
    </h1>
    <p class="text-gray-600 mb-6">{message}</p>
    <div class="modal-action mt-6">
      <button class="btn btn-primary" on:click={confirm}>
        {#if isLoading}
          <span class="loading loading-spinner" />
        {:else}
          {confirmText}
        {/if}
      </button>
      <form method="dialog">
        <button class="btn" on:click={cancel}>{cancelText}</button>
      </form>
    </div>
  </div>
</dialog>
