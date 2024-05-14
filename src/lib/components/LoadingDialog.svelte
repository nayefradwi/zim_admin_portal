<script lang="ts">
  export let title: string = "Loading";
  export let showModal: boolean;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();

  function _onClose(): void {
    showModal = false;
    dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  on:close={_onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">
      {title}
    </h1>
    <div class="loading loading-spinner"></div>
  </div>
</dialog>
